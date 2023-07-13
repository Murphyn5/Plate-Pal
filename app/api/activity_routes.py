from flask import Blueprint, jsonify, request
from app.models import db, Business, Review, Image, User
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

activity_routes = Blueprint('activity', __name__)

# GET ALL BUSINESS AND REVIEWS (ACTIVITY)

@activity_routes.route('/')
def get_activity():
    businesses = [business.to_dict() for business in Business.query.all()]
    reviews = [review.to_dict() for review in Review.query.all()]

    for review in reviews:
        business = Business.query.get(review['business_id'])
        user = User.query.get(review['owner_id'])
        review['business_name'] = business.name
        review['owner_firstname'] = user.first_name
        review['owner_lastname'] = user.last_name
        review['business_image'] = business.images[0].url

    for business in businesses:
        images_query = db.session.query(Image).filter(
            Image.business_id == business['id'])
        images = images_query.all()

        business['images'] = [image.to_dict() for image in images]

    return {"activities": reviews + businesses}
