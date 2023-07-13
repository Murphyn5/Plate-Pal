/* ----- CONSTANTS ----- */
const GET_ACTIVITIES = "activities/GET_ACTIVITIES";

/* ----- ACTIONS ----- */
const getActivitiesAction = (activities) => {
  return {
    type: GET_ACTIVITIES,
    activities,
  };
};

/* ----- THUNKS ----- */

// Display all activities at root page
export const getActivitiesThunk = () => async (dispatch) => {
  const res = await fetch("/api/activity/");
  if (res.ok) {
    const activities = await res.json();
    dispatch(getActivitiesAction(activities));
  }
};

/* ----- INITIAL STATE ----- */
const initialState = {
};

/* ----- REDUCER ----- */
const activityReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case GET_ACTIVITIES:
      return { ...newState, ...action.activities };
    default:
      return state;
  }
};

export default activityReducer;
