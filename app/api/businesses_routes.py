from flask import Blueprint, jsonify, request
from app.models import db, Business, Review, Image, User
from .auth_routes import validation_errors_to_error_messages
from flask_login import current_user, login_required
from app.forms.businesses_form import BusinessForm
from app.forms.reviews_form import ReviewForm
from app.forms.images_form import ImageForm
from datetime import datetime
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename)

business_routes = Blueprint('business', __name__)


# GET ALL BUSINESSES
@business_routes.route('/')
def get_businesses():
    businesses = Business.query.all()
    return {'businesses': {business.id: business.to_dict() for business in businesses}}


# GET ALL BUSINESSES BY CURRENT USER
@business_routes.route('/current')
@login_required
def get_businesses_current():
    user_id = int(current_user.get_id())
    business_query = db.session.query(
        Business).filter(Business.owner_id == user_id)
    businesses = [business.to_dict() for business in business_query.all()]

    for business in businesses:
        images_query = db.session.query(Image).filter(
            Image.business_id == business["id"])
        images = images_query.all()
        business["images"] = [image.to_dict() for image in images]

    return {'businesses': {business["id"]: business for business in businesses}}


# GET BUSINESS DETAILS BY ID
@business_routes.route('/<int:id>')
def get_business_details(id):
    # Single business
    business = Business.query.get(id).to_dict()

    if not business:
        return {
            "errors": "Business couldn't be found",
            "status_code": 404
        }, 404

    # Handle reviews
    review_query = db.session.query(Review).filter(Review.business_id == id)
    business_reviews = review_query.all()
    stars = [review.stars for review in business_reviews]
    if len(business_reviews) > 0:
        avg_rating = sum(stars) / len(business_reviews)
    else:
        avg_rating = 0
    business['avg_rating'] = avg_rating
    business['number_of_reviews'] = len(business_reviews)

    # Handle images
    images_query = db.session.query(Image).filter(Image.business_id == id)
    images = images_query.all()
    business['images'] = [image.to_dict() for image in images]

    return jsonify(business)


# GET REVIEWS BY BUSINESS ID
@business_routes.route('/<int:id>/reviews')
def get_business_reviews(id):

    review_query = db.session.query(Review).filter(Review.business_id == id)
    business_reviews = [review.to_dict() for review in review_query.all()]

    for review in business_reviews:
        owner = User.query.get(review["owner_id"])
        images_count = len(owner.images)
        owner = owner.to_dict()
        images_query = db.session.query(Image).filter(
            Image.review_id == review['id'])
        images = images_query.all()
        review["images_length"] = len(images)
        review['images'] = [image.to_dict() for image in images]
        review['owner_first_name'] = owner["first_name"]
        review['owner_last_name'] = owner["last_name"]
        review["owner_images_count"] = images_count

    return {"businessReviews": {review['id']: review for review in business_reviews}}


# CREATE NEW BUSINESS
@business_routes.route('/', methods=['POST'])
@login_required
def create_new_business():
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        new_business = Business(
            owner_id=int(current_user.get_id()),
            name=data['name'],
            category=data['category'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zipcode=data['zipcode'],
            phone_number=data['phone_number'],
            website=data['website'],
            lat=data['lat'],
            lng=data['lng'],
            price=data['price'],
            hours_of_operation=data['hours_of_operation']
        )
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400


# CREATE NEW REVIEW
@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_new_review(id):
    business = Business.query.get(id)
    if not business:
        return {
            "errors": ["Business couldn't be found"],
            "status_code": 404
        }, 404
    if business.to_dict()["owner_id"] == int(current_user.get_id()):
        return {
            "errors": ["Unable to write a review for your own business"],
            "status_code": 403
        }, 403

    review_query = db.session.query(Review).filter(Review.business_id == id).filter(
        Review.owner_id == int(current_user.get_id()))
    user_business_reviews = review_query.all()
    if len(user_business_reviews) > 0:
        return {
            "errors": ["User already has a review for this business"],
            "status_code": 403
        }, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        new_review = Review(
            owner_id=int(current_user.get_id()),
            business_id=id,
            review=data['review'],
            stars=data['stars'],
        )

        db.session.add(new_review)
        db.session.commit()

        new_review = new_review.to_dict()

        owner = User.query.get(new_review["owner_id"])
        images_count = len(owner.images)
        owner = owner.to_dict()
        images_query = db.session.query(Image).filter(
            Image.review_id == new_review["id"])
        images = images_query.all()
        new_review["images_length"] = len(images)
        new_review['images'] = [image.to_dict() for image in images]
        new_review['owner_first_name'] = owner["first_name"]
        new_review['owner_last_name'] = owner["last_name"]
        new_review["owner_images_count"] = images_count

        return new_review

    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400


# CREATE NEW IMAGE FOR A BUSINESS

@business_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def create_new_image(id):
    user = User.query.get(int(current_user.get_id()))
    business = Business.query.get(id)
    if not business:
        return {
            "errors": "Business couldn't be found",
            "status_code": 404
        }, 404

    form = ImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        image_file = form.data['image']

        image_file.filename = get_unique_filename(image_file.filename)
        s3_image_url = upload_file_to_s3(image_file)
        if s3_image_url:
            new_image = Image(
                owner_id=int(current_user.get_id()),
                business_id=id,
                url=s3_image_url['url'],
                caption=data['caption']
            )
            db.session.add(new_image)
            db.session.commit()
            image = new_image.to_dict()
            image["business_name"] = business.name
            image["business_id"] = business.id
            image["user_first_name"] = user.first_name
            image["user_last_name"] = user.last_name
            return image
        else:
            return {
                "message": "Error uploading image to S3",
                "statusCode": 400,
            }, 400
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400



# UPDATE BUSINESS
@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_business(id):

    business = Business.query.get(id)
    if not business:
        return {
            "errors": ["Business couldn't be found"],
            "status_code": 404
        }, 404

    data = request.get_json()
    if int(current_user.get_id()) == business.owner_id:
        business.name = data['name']
        business.category = data['category']
        business.address = data['address']
        business.city = data['city']
        business.state = data['state']
        business.zipcode = data['zipcode']
        business.phone_number = data['phone_number']
        business.website = data['website']
        business.lat = data['lat']
        business.lng = data['lng']
        business.price = data['price']
        business.hours_of_operation = data['hours_of_operation']
        business.updated_at = datetime.utcnow()

        db.session.commit()
        return business.to_dict()

    else:
        {
            "errors": ["Forbidden"],
            "status_code": 403
        }, 403


# DELETE A BUSINESS
@business_routes.route('/<int:id>', methods=['DELETE'])
def delete_business(id):
    business = Business.query.get(id)

    if not business:
        return {
            "errors": "Business couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == business.owner_id:
        db.session.delete(business)
        db.session.commit()
        return {
            "errors": "Successfully deleted",
            "status_code": 200
        }
    else:
        return {
            "errors": "Forbidden",
            "status_code": 403
        }, 403

# SEARCH FOR BUSINESSES

@business_routes.route('/search')
def search_businesses():
    if request.args:
        search_query = request.args['query']
        if not search_query:
            return {'businesses': {}}

        businesses_query = Business.query.filter(
            (Business.name.ilike(f'%{search_query}%')) |
            (Business.category.ilike(f'%{search_query}%')) |
            (Business.address.ilike(f'%{search_query}%')) |
            (Business.city.ilike(f'%{search_query}%')) |
            (Business.state.ilike(f'%{search_query}%'))
        )

        businesses = [business.to_dict()
                      for business in businesses_query.all()]

        for business in businesses:
            images_query = db.session.query(Image).filter(
                Image.business_id == business["id"])
            images = images_query.all()
            business["images"] = [image.to_dict() for image in images]

            # Handle reviews
            review_query = db.session.query(Review).filter(
                Review.business_id == business["id"])
            business_reviews = review_query.all()
            stars = [review.stars for review in business_reviews]
            if len(business_reviews) > 0:
                avg_rating = sum(stars) / len(business_reviews)
            else:
                avg_rating = 0
            business['avg_rating'] = avg_rating
            business['number_of_reviews'] = len(business_reviews)

        return {'businesses': {business["id"]: business for business in businesses}}

    return {'businesses': {}}
