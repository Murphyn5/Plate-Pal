import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviewsThunk } from "../../../store/reviews";
import ReviewCard from "../ReviewCard";
import ColoredLine from "../../ColoredLine";
import { Link } from "react-router-dom";

import "./ManageReviewsIndex.css";

const ManageReviewsIndex = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    let reviews = useSelector((state) => state.reviews.userReviews);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const reviewRestore = async () => {
            await dispatch(getUserReviewsThunk());
        };
        reviewRestore();
    }, [dispatch]);

    if (!reviews) return null;

    reviews = Object.values(reviews)

    reviews?.sort(
        (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
    );



    return (
        <>
            <div className="manage-reviews-index-container">
                <br></br>
                <br></br>
                <h2 className="manage-reviews-index-title">{`Reviews for ${user.first_name} ${user.last_name[0]}.`}</h2>
                <br></br>
                <ColoredLine />
                <br></br>
                <div>
                    {
                        reviews.length === 0 ?
                            <div style={{ alignSelf: "flex-start" }}>No Reviews to Show</div>
                            : reviews.map((review) => {
                                return (
                                    <>
                                        <h3 className="manage-reviews-review-title">Review for <Link to={`/businesses/${review.business_id}`}>{review.business_name}</Link></h3>
                                        <ReviewCard
                                            review={review}
                                            key={review.id}
                                        />
                                    </>
                                );
                            })}
                </div>
            </div>
        </>
    );
};

export default ManageReviewsIndex;
