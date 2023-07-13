import { getSingleBusinessThunk } from "./businesses";

/* ----- CONSTANTS ----- */
const GET_BUSINESS_REVIEWS = "reviews/GET_BUSINESS_REVIEWS";
const GET_USER_REVIEWS = "reviews/GET_USER_REVIEWS";
const POST_REVIEW = "reviews/POST_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";
const POST_REVIEW_IMAGE = "reviews/POST_REVIEW_IMAGE"

/* ----- ACTIONS ----- */
const getBusinessReviewsAction = (reviews) => {
    return {
        type: GET_BUSINESS_REVIEWS,
        reviews,
    };
};

const getUserReviewsAction = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews,
    };
};

const postReviewAction = (review) => {
    return {
        type: POST_REVIEW,
        review,
    };
};

const deleteReviewAction = (id) => {
    return {
        type: DELETE_REVIEW,
        id,
    };
};

const getSingleReviewAction = (review) => {
    return {
        type: GET_SINGLE_REVIEW,
        review,
    };
};

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review,
    };
};

const postReviewImageAction = (reviewImage) => {
    return {
        type: POST_REVIEW_IMAGE,
        reviewImage
    }
}

/* ----- THUNKS ----- */

// Display all business reviews at business detail page
export const getBusinessReviewsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${id}/reviews`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getBusinessReviewsAction(reviews));
    }
};

// Display all user reviews at manage reviews page
export const getUserReviewsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/reviews/current`);
    if (res.ok) {
        const reviews = await res.json();
        dispatch(getUserReviewsAction(reviews));
    }
};

// Delete review by review id for current user
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteReviewAction(reviewId));
    }
};

// Post new review by business id for current user
export const postReviewThunk = (newReview, businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
    });

    if (res.ok) {
        const createdReview = await res.json();
        dispatch(postReviewAction(createdReview));
        dispatch(getSingleBusinessThunk(businessId));
        return createdReview;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return { "errors": ["A server error occurred. Please try again."] };
    }
};

// Get single review by review id
export const getSingleReviewThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);
    if (res.ok) {
        const singleReview = await res.json();
        dispatch(getSingleReviewAction(singleReview));
        return singleReview;
    }
};

// Edit review by review id via current user
export const editReviewThunk =
    (reviewId, reviewContent) => async (dispatch) => {
        const res = await fetch(`/api/reviews/${reviewId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewContent),
        });
        if (res.ok) {
            const editedReview = await res.json();
            dispatch(editReviewAction(editedReview));
            dispatch(getSingleBusinessThunk(editedReview.business_id))
            return editedReview;
        } else if (res.status < 500) {
            const data = await res.json();
            if (data.errors) {
                return data.errors;
            }
        } else {
            return { "errors": ["A server error occurred. Please try again."] };
        }
    };

// Add an image to a review
export const postReviewImageThunk = (imageContent, reviewId, businessId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: imageContent
    })
    if (res.ok) {
        await dispatch(getBusinessReviewsThunk(businessId))
        await dispatch(getUserReviewsThunk())
    } else if (res.status < 500) {
        const data = await res.json();
        return data;
    } else {
        return { "errors": ["A server error occurred. Please try again."] };
    }
}

/* ----- INITIAL STATE ----- */
const initialState = {
    businessReviews: null,
    userReviews: null,
    singleReview: null,
};

/* ----- REDUCER ----- */
const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_BUSINESS_REVIEWS:
            newState.businessReviews = action.reviews.businessReviews;
            return newState;
        case GET_USER_REVIEWS:
            newState.userReviews = action.reviews.userReviews;
            return newState;
        case POST_REVIEW:
            newState.singleReview = action.review;
            return newState;
        case DELETE_REVIEW:
            if (newState.userReviews) {
                delete newState.userReviews[action.id];
            }
            if (newState.businessReviews) {
                delete newState.businessReviews[action.id];
            }
            return newState;
        case GET_SINGLE_REVIEW:
            newState.singleReview = action.review;
            return newState;
        case EDIT_REVIEW:
            newState.singleReview = action.review;
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;
