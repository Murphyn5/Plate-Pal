import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleReviewThunk, editReviewThunk } from "../../../store/reviews";

import "./ReviewEdit.css";

const ReviewEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewId } = useParams();

  const currentUser = useSelector((state) => state.session.user);
  const singleReview = useSelector((state) => state.reviews.singleReview);

  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // star rating hover
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [starsColor, setStarsColor] = useState("")

  // repopulating input fields
  useEffect(() => {
    dispatch(getSingleReviewThunk(reviewId));

    const restoreReview = async () => {
      let restoreReview = await dispatch(getSingleReviewThunk(reviewId));

      // redirect user to 404 custom page like Yelp's?
      // if (!restoreReview) return history.push("/");
      // if (restoreReview?.owner_id !== currentUser.id) history.push("/");

      // if review was not found, then state for reviews.singleReview won't be updated, would return null
      setReview(restoreReview?.review);
      setStars(restoreReview?.stars);
    };

    restoreReview();
  }, [dispatch]);

  useEffect(() => {
    if(stars === 1){
      setStarsColor("yellow")
    }
    if(stars === 2){
      setStarsColor("gold")
    }
    if(stars === 3){
      setStarsColor("orange")
    }
    if(stars === 4){
      setStarsColor("amber")
    }
    if(stars === 5){
      setStarsColor("red")
    }
  }, [stars])

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (errors.length) return;

    const reviewContent = {
      review,
      stars,
    };

    let response = await dispatch(editReviewThunk(reviewId, reviewContent));

    if (Array.isArray(response)) setErrors(response);

    if (!Array.isArray(response)) {
      history.goBack();
    }
  };

  // handle error validations frontend
  useEffect(() => {
    let valErrors = [];

    if (review?.length < 1) valErrors.push("Review description is required");
    if (stars < 1 || stars > 5)
      valErrors.push("Star ratings must be between 1-5");

    setErrors(valErrors);
  }, [review, stars]);

  if (!singleReview) return "Review not found";
  if (singleReview.owner_id !== currentUser.id) history.push("/");

  return (
    <div>
      <form className="edit-review-container" onSubmit={onSubmit}>
        <br></br>
        <h3>{singleReview.business_name}</h3>
        <br></br>
        <ul>
          {hasSubmitted &&
            errors.map((error, idx) => (
              <li style={{ color: "red" }} key={idx}>
                {error}
              </li>
            ))}
        </ul>
        <div className="review-form-stars-container">
          {/* Each star value 1-5
            On hover/click, set stars value to appropriate number */}
          <span>{` Select your rating: `}&nbsp;</span>
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
            placeholder="Leave a review here"
            className="edit-review-textarea"
            type="textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <br></br>
        <button className="update-review-post-button">Update Review</button>
      </form>
    </div>
  );
};

export default ReviewEdit;
