from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from flask_login import current_user
from flask import request
from app.models import Review

def stars_range_check(form, field):
    # Checking if username is already in use

    stars = field.data

    if stars < 1 or stars > 5:
        raise ValidationError('Stars must be an integer from 1 to 5')


class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired(), stars_range_check])
