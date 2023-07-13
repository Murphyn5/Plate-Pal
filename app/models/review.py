from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    owner = db.relationship("User", back_populates="reviews")
    business = db.relationship("Business", back_populates = "reviews")
    images = db.relationship("Image", cascade="all, delete", back_populates = "review")

    def to_dict(self):
        return {
            "id" : self.id,
            "review" : self.review,
            "stars" : self.stars,
            "owner_id" : self.owner_id,
            "business_id" : self.business_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at,
        }
