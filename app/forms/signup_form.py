from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Length
from app.models import User


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired(), Length(max=24, message="First name must be less than 24 characters.")])
    last_name = StringField(
        'last_name', validators=[DataRequired(), Length(max=24, message="Last name must be less than 24 characters.")])
    zipcode = IntegerField(
        'zipcode', validators=[DataRequired(), NumberRange(min=10000, max=99999, message="Zipcode length must be 5 characters.")])
    email = StringField('email', validators=[DataRequired(), Email(), Length(max=120, message="Email must be less than 120 characters."), email_exists])
    password = StringField('password', validators=[DataRequired()])
