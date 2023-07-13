// frontend/src/components/deleteFormModal/index.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./BusinessDelete.css";
import {
  deleteBusinessThunk,
  getSingleBusinessThunk,
} from "../../../store/businesses";
import ColoredLine from "../../ColoredLine";

function BusinessDelete() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const history = useHistory();
  const business = useSelector((state) => state.businesses.singleBusiness);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteBusinessThunk(businessId));
    history.goBack();
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId));
  }, [dispatch]);


  if (!business) return null;

  return (
    <>
      <div className="business-delete-form-container">
        <form className={"delete-form"} onSubmit={handleSubmit}>
          <br></br>
          <br></br>
          <h2 className="business-delete-form-title">
            Confirm Business Delete
          </h2>
          <br></br>
          <ColoredLine></ColoredLine>
          <br></br>
          <span>
            Are you sure you want to remove this business from the listings?
          </span>
          <div>
            <br></br>
            <h3>{business?.name}</h3>
          </div>
          <img
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            src={business.images.length ? business.images[0]?.url : ""}
          ></img>
          <i className="fa-solid fa-image-slash"></i>
          <br></br>
          <br></br>
          <div className="business-delete-form-button-container">
            <button
              type="submit"
              onClick={handleSubmit}
              className="business-delete-form-delete-button"
            >
              Delete
            </button>
            <div
              type="submit"
              onClick={handleCancel}
              className="image-delete-form-cancel-button"
            >
              Cancel
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BusinessDelete;
