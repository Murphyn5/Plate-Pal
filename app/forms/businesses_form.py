from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange, URL, Regexp, ValidationError
import re

def validatePhoneNum(form, field):
    if not re.search(r"\d{3}[-]\d{3}[-]\d{4}$", field.data):
        raise ValidationError("Invalid phone number: format must be xxx-xxx-xxxx")

class BusinessForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=0, max=40, message="Name must be less than 40 characters.")])
    category = StringField("Category", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired(), Length(max=64, message="Address must be less than 64 characters.")])
    city = StringField("City", validators=[DataRequired(), Length(max=25, message="City must be less than 25 characters.")])
    state = StringField("State", validators=[DataRequired(), Length(min=2, max=2, message="State must be abbreviated (2 characters).")])
    zipcode = IntegerField("Zip Code", validators=[DataRequired(), NumberRange(min=10000, max=99999, message="Zipcode length must be 5 characters.")])
    phone_number = StringField("Phone Number", validators=[DataRequired(), validatePhoneNum])
    website = StringField("Website", validators=[DataRequired(), URL()])
    lat = DecimalField("Latitude", places=7)
    lng = DecimalField("Longitude", places=7)
    price = IntegerField("Price")
    hours_of_operation = StringField("Hours of Operations", validators=[DataRequired()])
