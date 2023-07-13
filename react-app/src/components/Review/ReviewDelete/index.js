// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import "./ReviewDelete.css";
import { deleteReviewThunk } from "../../../store/reviews";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ColoredLine from "../../ColoredLine";
import { getSingleReviewThunk } from "../../../store/reviews";
import ReviewDeleteCard from "../ReviewDeleteCard";



function ReviewDelete() {
  const dispatch = useDispatch();
  const { reviewId } = useParams()
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [review, setReview] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteReviewThunk(reviewId))
    history.goBack()
  };

  const handleCancel = async (e) => {
    e.preventDefault()
    history.goBack()
  };




  useEffect(() => {

    const reviewRestore = async () => {
      const confirmReview = await dispatch(getSingleReviewThunk(reviewId))
      if (!confirmReview || confirmReview.owner_id !== user.id) {
        history.goBack()
      }
      else {
        setReview(confirmReview)
      }
    }
    reviewRestore()

  }, [dispatch])


  if (!review) {
    return null
  }

  return (
    <>
      <div className="review-delete-form-container">
        <form className={"review-delete-form"} onSubmit={handleSubmit}>
          <br></br>
          <br></br>
          <h2 className="review-delete-form-title">Confirm Removal</h2>
          <br></br>
          <ColoredLine></ColoredLine>
          <br></br>
          <div>
            Are you sure you want to remove this review?
          </div>
          <br></br>
          <br></br>
          <h3>Review for {review.business_name}</h3>
          <div className="review-delete-review-card">
            <ReviewDeleteCard review={review} />
          </div>
          <div className="review-delete-form-button-container">
            <button type="submit" onClick={handleSubmit} className="review-delete-form-delete-button">Remove</button>
            <div type="submit" onClick={handleCancel} className="review-delete-form-cancel-button">Cancel</div>
          </div>
        </form>
      </div>
    </>
  );
}


export default ReviewDelete;
