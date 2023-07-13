import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImagesAction } from "../../../store/images";
import ColoredLine from "../../ColoredLine";
import { useParams } from "react-router-dom";
import { getSingleReviewThunk } from "../../../store/reviews";
import ImageCard from "../../Images/ImageCard";
import { Link } from "react-router-dom";
import "./ReviewImagesIndex.css";

const ReviewImagesIndex = () => {
    const history = useHistory()
    const { reviewId } = useParams()
    const dispatch = useDispatch();
    let images = useSelector((state) => state.images.images);
    const user = useSelector((state) => state.session.user);
    const review = useSelector((state) => state.reviews.singleReview)

    useEffect(() => {
        const imageRestore = async () => {
            const review = await dispatch(getSingleReviewThunk(reviewId))
            if (review) {
                let images = {}
                for (let i = 0; i < review.images.length; i++) {
                    images[review.images[i].id] = review.images[i]
                }
                await dispatch(getImagesAction({ "images": images }));
            } else{
                history.push("/404")
            }
        };
        imageRestore();
    }, [dispatch]);

    if (!images || !review) return null;

    images = Object.values(images)

    images?.sort(
        (a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)
    );

    let index = 0


    return (
        <>

            <div className="review-images-index-container">
                <br></br>
                <h2 className="review-images-index-title">Images for <Link to={`/businesses/${review.business_id}`}>{review.business_name}</Link> from {review.owner_first_name} {review.owner_last_name[0]}</h2>
                <br></br>
                <ColoredLine />
                <br></br>
                <div className="review-images-index-grid">
                    {
                        images.length === 0 ?
                            <div>No Images to Show</div>
                            : images.map((image) => {
                                index++
                                return (
                                    <ImageCard
                                        image={image}
                                        key={image.id}
                                        index={index}
                                    />
                                );
                            })}
                </div>
            </div>
        </>
    );
};

export default ReviewImagesIndex;
