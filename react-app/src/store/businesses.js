import { getBusinessReviewsThunk } from "./reviews";

/* ----- CONSTANTS ----- */
const GET_SINGLE_BUSINESS = "businesses/GET_SINGLE_BUSINESS";
const GET_CURRENT_BUSINESSES = "businesses/GET_CURRENT_BUSINESSES";
const POST_BUSINESS = "businesses/POST_BUSINESS";
const DELETE_BUSINESS = "businesses/DELETE_BUSINESS";
const EDIT_BUSINESS = "businesses/EDIT_BUSINESS";
const SEARCH_BUSINESSES = "businesses/SEARCH_BUSINESSES";
const GET_ALL_BUSINESSES = "businesses/GET_ALL_BUSINESSES";
const FILTERED_BUSINESSES = "businesses/FILTERED_BUSINESSES";

/* ----- ACTIONS ----- */
const getSingleBusinessAction = (business) => {
  return {
    type: GET_SINGLE_BUSINESS,
    business,
  };
};

const getAllBusinessesAction = (businesses) => {
  return {
    type: GET_ALL_BUSINESSES,
    businesses,
  };
};

const getCurrentBusinessesAction = (businesses) => {
  return {
    type: GET_CURRENT_BUSINESSES,
    businesses,
  };
};

const postBusinessAction = (business) => {
  return {
    type: POST_BUSINESS,
    business,
  };
};

const deleteBusinessAction = (id) => {
  return {
    type: DELETE_BUSINESS,
    id,
  };
};

const editBusinessAction = (business) => {
  return {
    type: EDIT_BUSINESS,
    business,
  };
};

const searchBusinessesAction = (businesses) => {
  return {
    type: SEARCH_BUSINESSES,
    businesses,
  };
};

export const filteredBusinessAction = (businesses) => {
  return {
    type: FILTERED_BUSINESSES,
    businesses,
  };
};

/* ----- THUNKS ----- */

// Delete business by business id for current user
export const deleteBusinessThunk = (businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteBusinessAction(businessId));
  }
};

// Display single business details
export const getSingleBusinessThunk = (id) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${id}`);
  if (res.ok) {
    const business = await res.json();
    dispatch(getSingleBusinessAction(business));
    return business;
  }
};

//get all businesses
export const getAllBusinessesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/businesses`);
  if (res.ok) {
    const businesses = await res.json();
    dispatch(getAllBusinessesAction(businesses));
  }
};

// Display current user businesses
export const getCurrentBusinessesThunk = () => async (dispatch) => {
  const res = await fetch(`/api/businesses/current`);
  if (res.ok) {
    const businesses = await res.json();
    dispatch(getCurrentBusinessesAction(businesses));
  }
};

// Create a new business
export const postBusinessThunk = (newBusiness) => async (dispatch) => {
  const res = await fetch(`/api/businesses/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBusiness),
  });
  if (res.ok) {
    const createdBusiness = await res.json();
    dispatch(postBusinessAction(createdBusiness));
    return createdBusiness;
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return {"errors": ["A server error occurred. Please try again."]};
  }
};


// Add an image to a business
export const postBusinessImageThunk = (imageContent, businessId) => async (dispatch) => {
  const res = await fetch(`/api/businesses/${businessId}/images`, {
      method: "POST",
      body: imageContent
  })
  if (res.ok) {
    await dispatch (getSingleBusinessThunk(businessId))
    await dispatch(getBusinessReviewsThunk(businessId))
  } else if (res.status < 500) {
    const data = await res.json();
    return data;
  } else {
    return {"errors": ["A server error occurred. Please try again."]};
  }
}

// Edit a business by id
export const editBusinessThunk =
  (businessContent, businessId) => async (dispatch) => {
    const res = await fetch(`/api/businesses/${businessId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(businessContent),
    });

    if (res.ok) {
      const editedBusiness = await res.json();
      dispatch(editBusinessAction(editedBusiness));
      return editedBusiness;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data;
      }
    } else {
      return {"errors": ["A server error occurred. Please try again."]};
    }
  };

// Search businesses through search bar
export const searchBusinessesThunk = (searchString) => async (dispatch) => {
  const res = await fetch(`/api/businesses/search?query=${searchString}`);
  if (res.ok) {
    const searchResults = await res.json();
    dispatch(searchBusinessesAction(searchResults));
    return searchResults;
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
  businesses: null,
  singleBusiness: null,
  filteredBusinesses: null,
};

/* ----- REDUCER ----- */
const businessReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SINGLE_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case GET_CURRENT_BUSINESSES:
      newState.businesses = action.businesses.businesses;
      return newState;
    case POST_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case DELETE_BUSINESS:
      if (newState.businesses) {
        delete newState.businesses[action.id];
      }
      return newState;
    case EDIT_BUSINESS:
      newState.singleBusiness = action.business;
      return newState;
    case SEARCH_BUSINESSES:
      newState.businesses = action.businesses.businesses;
      newState.filteredBusinesses = Object.values(action.businesses.businesses);
      return newState;
    case GET_ALL_BUSINESSES:
      newState.businesses = action.businesses.businesses;
      return newState;
    case FILTERED_BUSINESSES:
      newState.filteredBusinesses = action.businesses;
      return newState;
    default:
      return state;
  }
};

export default businessReducer;
