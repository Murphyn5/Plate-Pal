import { getSingleBusinessThunk } from "./businesses";

/* ----- CONSTANTS ----- */
const GET_IMAGES = "images/GET_IMAGES";
const GET_SINGLE_IMAGE = "images/GET_SINGLE_IMAGE"
const POST_IMAGE = "images/POST_IMAGE";
const DELETE_IMAGE = "images/DELETE_IMAGE";


/* ----- ACTIONS ----- */

export const getImagesAction = (images) => {
    return {
        type: GET_IMAGES,
        images
    };
};

const getSingleImageAction = (image) => {
    return {
        type: GET_SINGLE_IMAGE,
        image
    };
};

const postImageAction = (image) => {
    return {
        type: POST_IMAGE,
        image,
    };
};

const deleteImageAction = (id) => {
    return {
        type: DELETE_IMAGE,
        id,
    };
};

/* ----- THUNKS ----- */

// Post new image by business id for current user
export const postImageThunk =
    (newImage, businessId) => async (dispatch) => {
        const res = await fetch(`/api/businesses/${businessId}/images`, {
            method: "POST",
            body: newImage
        });

        if (res.ok) {
            const createdImage = await res.json();
            dispatch(postImageAction(createdImage));
            dispatch(getSingleBusinessThunk(businessId));
            return createdImage;
        } else if (res.status < 500) {
            const data = await res.json();
            return data
        } else {
            return {"errors": "A server error occurred. Please try again."};
        }
    };

// Delete image by image id for current user
export const deleteImageThunk = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
        method: "DELETE"
    });
    if (res.ok) {
        dispatch(deleteImageAction(imageId));
    } else if (res.status < 500) {
        const data = await res.json();
        return data
    } else {
        return {"errors": "A server error occurred. Please try again."};
    }
};

// Display all user images at manage images page
export const getImagesThunk = () => async (dispatch) => {
    const res = await fetch(`/api/images/current`);
    if (res.ok) {
        const images = await res.json();
        dispatch(getImagesAction(images));
    }
};

export const getSingleImageThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/images/${id}`);
    if (res.ok) {
        const image = await res.json();
        dispatch(getSingleImageAction(image));
        return image
    }
};

/* ----- INITIAL STATE ----- */
const initialState = {
    images: null,
    singleImage: null,
};

/* ----- REDUCER ----- */
const imagesReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_IMAGES:
            newState.images = action.images.images;
            return newState;
        case GET_SINGLE_IMAGE:
            newState.singleImage = action.image;
            return newState;
        case DELETE_IMAGE:
            if (newState.images) {
                delete newState.images[action.id]
            }
            return newState
        case POST_IMAGE:
            newState.singleImage = action.image;
            return newState;
        default:
            return state;
    }
};

export default imagesReducer;
