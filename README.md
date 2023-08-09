# About Plate-Pal

Plate Pal is a web application inspired by Yelp. It allows users to search for businesses, view business pages, leave reviews and ratings. [Click here to visit Plate Pal's live site](https://plate-pal-acn4.onrender.com/).

<br>

# Wiki Links

- [Feature List](https://github.com/truham/Plate-Pal/wiki/Feature-List)
- [User Stories](https://github.com/truham/Plate-Pal/wiki/User-Stories)
- [Database Schema](https://github.com/truham/Plate-Pal/wiki/Database-schema)
- [API Routes](https://github.com/truham/Plate-Pal/wiki/API-Routes)
- [Redux Store State Shape](https://github.com/truham/Plate-Pal/wiki/Store-Shape)

<br>

# Tech Stack

Backend:

[![Python][python.js]][python-url]
[![Flask][flask.js]][flask-url]
[![PostgreSQL][postgresql.js]][postgresql-url]

Frontend:

[![HTML][html.js]][html-url]
[![CSS][css.js]][css-url]
[![Javascript][javascript.js]][javascript-url]
[![React][react.js]][react-url]
[![Redux][redux.js]][redux-url]

Other:

![Amazon S3](https://img.shields.io/static/v1?style=for-the-badge&message=Amazon+S3&color=569A31&logo=Amazon+S3&logoColor=FFFFFF&label=)
![Google Maps](https://img.shields.io/static/v1?style=for-the-badge&message=Google+Maps&color=4285F4&logo=Google+Maps&logoColor=FFFFFF&label=)

<br>

# Features Directions

## Business Details

Any user is able to view the details to a specific business
![business-details]

[business-details]: ./assets/business-details.png

## Search for Businesses

Any user is able to search for businesses to narrow down their interests
![search-business]

[search-business]: ./assets/business-search.png

## Write a Review

Logged in users are able to write reviews for specific businesses
![review-write]

[review-write]: ./assets/review-write.png

## Add a Business

Logged in users are able to create new businesses with the following details
![add-business]

[add-business]: ./assets/add-business.png

## Add a Business

Any user is able to view all images associated with a review or business within a modal
![images-modal]

[images-modal]: ./assets/images-modal.png

## Features List

- <input type="checkbox" checked> User Authentication
- <input type="checkbox" checked> Businesses
- <input type="checkbox" checked> Reviews
- <input type="checkbox" checked> Business Search
- <input type="checkbox" checked> Images for Businesses & Reviews
- <input type="checkbox" checked> AWS S3 - Image Upload
- <input type="checkbox" checked> Google Maps API - Business Markers

<br>

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/truham/Plate-Pal

   ```
2. Install dependencies at the root directory
   ```sh
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory. Install the npm packages while inside of the `react-app` directory.

   ```bash
   npm install
   ```

6. Run the backend server at the root directory with pipenv run flask run
   ```bash
   pipenv run flask run
   ```

7. Run the frontend server inside the `react-app` with npm start
   ```bash
   npm start
   ```
   <br>

# Contact

Nick Murphy
  - <input type="checkbox" checked> [GitHub](https://github.com/Murphyn5)
  - <input type="checkbox" checked> [Email](mailto:nlimurphy@gmail.com)
  - <input type="checkbox" checked> [Portfolio](https://murphyn5.github.io)
  - <input type="checkbox" checked> [LinkedIn](https://www.linkedin.com/in/nicholas-murphy-dev/)

Zak Beg
  - <input type="checkbox" checked> [GitHub](https://github.com/zakariya23)
  - <input type="checkbox" checked> [Email](mailto:commanderzee455@gmail.com)
  - <input type="checkbox" checked> [Portfolio](https://zakariya.io/)
  - <input type="checkbox" checked> [LinkedIn](https://www.linkedin.com/in/zakariya-beg-74919a201/)

- <input type="checkbox" checked> [GitHub](https://github.com/zakariya23)
- <input type="checkbox" checked> [Email](mailto:commanderzee455@gmail.com)
- <input type="checkbox" checked> [Portfolio]()
- <input type="checkbox" checked> [LinkedIn](https://www.linkedin.com/in/zakariya-beg-74919a201/)

Hamilton Truong

- <input type="checkbox" checked> [GitHub](https://github.com/truham)
- <input type="checkbox" checked> [Email](mailto:hamiltontruong@gmail.com)
- <input type="checkbox" checked> [Portfolio](https://truham.github.io/)
- <input type="checkbox" checked> [LinkedIn](https://www.linkedin.com/in/hamiltontruong/)

<!-- References and Icons -->

[html.js]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.js]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[javascript.js]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[python.js]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[flask.js]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[flask-url]: https://expressjs.com/
[postgresql.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
