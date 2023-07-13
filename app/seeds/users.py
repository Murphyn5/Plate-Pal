from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Jane',
        last_name='Doe',
        email='demo@user.io',
        zipcode=12345,
        password='password'
    )
    demo1 = User(
        first_name='John',
        last_name='Smith',
        email='demo1@user.io',
        zipcode=67891,
        password='password'
    )
    demo2 = User(
        first_name='Emily',
        last_name='Davis',
        email='demo2@user.io',
        zipcode=23456,
        password='password'
    )
    demo3 = User(
        first_name='Michael',
        last_name='Wilson',
        email='demo3@user.io',
        zipcode=78912,
        password='password'
    )
    demo4 = User(
        first_name='Sophia',
        last_name='Martinez',
        email='demo4@user.io',
        zipcode=34567,
        password='password'
    )

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
