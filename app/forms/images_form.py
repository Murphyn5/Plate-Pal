from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from app.s3_helpers import ALLOWED_EXTENSIONS, upload_file_to_s3

def extension_check(form, field):
    filename = field.data.filename.lower()
    if not any(filename.endswith(ext) for ext in ['.jpeg', '.png', '.jpg']):
        raise ValidationError('File does not have a valid extension')

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS, 'Images only!'), extension_check])
    caption = StringField('caption')
    # submit = SubmitField("Create Post")
