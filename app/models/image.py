from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")))
    caption = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    owner = db.relationship("User", back_populates="images")
    review = db.relationship("Review", back_populates = "images")
    business = db.relationship("Business", back_populates = "images")

    def to_dict(self):
        return {
            "id" : self.id,
            "url" : self.url,
            "caption": self.caption,
            "owner_id" : self.owner_id,
            "business_id" : self.business_id,
            "review_id" : self.review_id,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at,
        }
