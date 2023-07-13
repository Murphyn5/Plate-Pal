import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postReviewThunk } from "../../../store/reviews";
import { getSingleBusinessThunk } from "../../../store/businesses";
import { postReviewImageThunk } from "../../../store/reviews";

import "./ReviewCreate.css";

const ReviewCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const { businessId } = useParams();

  const user = useSelector((state) => state.session.user);
  const business = useSelector((state) => state.businesses.singleBusiness);

  const [review, setReview] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  // star rating hover
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [starsColor, setStarsColor] = useState("gray");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId));
  }, [dispatch]);

  useEffect(() => {
    if (stars === 1) {
      setStarsColor("yellow");
    }
    if (stars === 2) {
      setStarsColor("gold");
    }
    if (stars === 3) {
      setStarsColor("orange");
    }
    if (stars === 4) {
      setStarsColor("amber");
    }
    if (stars === 5) {
      setStarsColor("red");
    }
  }, [stars]);

  // frontend validations
  useEffect(() => {
    let valErrors = [];

    if (review?.length < 1) valErrors.push("Review description is required");
    if (review?.length > 1000) valErrors.push("Review description maximum characters is 1000")
    if (stars < 1 || stars > 5)
      valErrors.push("Star ratings must be between 1-5");

    // helper fxn check image url ending
    // const checkImageURL = (imageURL) => {
    //   return (
    //     !imageURL.endsWith(".png") &&
    //     !imageURL.endsWith(".jpg") &&
    //     !imageURL.endsWith(".jpeg")
    //   );
    // };


    setErrors(valErrors);
  }, [review, stars, imageURL]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (errors.length) return;

    const newReview = {
      review,
      stars,
    };

    // post the review
    let response = await dispatch(postReviewThunk(newReview, businessId, user));

    // all error responses for this backend route return as arrays
    if (Array.isArray(response)) setErrors(response);

    // handle image add after business has been created
    const imageContent = { url: imageURL, caption: imageCaption };
    const formData = new FormData()
    formData.append('image', imageURL)
    
    if (!Array.isArray(response) && imageURL) {
      await dispatch(
        postReviewImageThunk(formData, response.id, businessId)
      );
    }

    if (!Array.isArray(response)) {
      history.push(`/businesses/${businessId}`);
    }
  };

  if (!business) return null;

  return (
    <div>
      <form className="create-review-container" onSubmit={onSubmit}>
        <br></br>
        <h3>{business.name}</h3>
        <ul>
          {hasSubmitted &&
            errors.map((error, idx) => (
              <li style={{ color: "red" }} key={idx}>
                {error}
              </li>
            ))}
        </ul>
        <span style={{ color: "red" }}></span>
        <br></br>
        <div className="review-form-stars-container">
          {/* Each star value 1-5
            On hover/click, set stars value to appropriate number */}
          <span>{`Select your rating: `}&nbsp;</span>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || stars) ? "on" : "off"}
                onClick={() => setStars(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(stars)}
              >
                <span className="fa-stack review-star">
                  <i className={`fas fa-square fa-stack-2x ${starsColor}`}></i>
                  <i className="fas fa-star fa-stack-1x fa-inverse"></i>
                </span>
              </button>
            );
          })}
        </div>
        <br></br>
        <div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="create-review-textarea"
            placeholder="Leave a review here"
          ></textarea>
        </div>
        <span style={{ color: "red" }}></span>
        <br></br>
        <h4>Attach Images</h4>
        <input
          type="file"
          className="create-review-image-url"
          accept="image/*"
          onChange={(e) => setImageURL(e.target.files[0])}
          placeholder="Image URL (Optional)"
        ></input>

        <textarea
          type="textarea"
          className="create-review-textarea-caption"
          value={imageCaption}
          onChange={(e) => setImageCaption(e.target.value)}
          placeholder="Caption (Optional)"
        ></textarea>
        <br></br>
        <button className="create-review-post-button">Post Review</button>
      </form>
    </div>
  );
};

export default ReviewCreate;
