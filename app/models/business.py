from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    website = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float(precision=9, asdecimal=True))
    lng = db.Column(db.Float(precision=9, asdecimal=True))
    price = db.Column(db.Integer)
    hours_of_operation = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    owner = db.relationship("User", back_populates="businesses")
    reviews = db.relationship("Review", cascade="all, delete", back_populates = "business")
    images = db.relationship("Image", cascade="all, delete", back_populates = "business")

    def to_dict(self):
        return {
            "id" : self.id,
            "owner_id" : self.owner_id,
            "name" : self.name,
            "category" : self.category,
            "address" : self.address,
            "city" : self.city,
            "state" : self.state,
            "zipcode" : self.zipcode,
            "phone_number" : self.phone_number,
            "website" : self.website,
            "lat" : self.lat,
            "lng" : self.lng,
            "price" : self.price,
            "hours_of_operation" : self.hours_of_operation,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at,
        }
