import {
  ALUMNI_FAILURE,
  ALUMNI_REQUEST,
  ALUMNI_SUCCESS,
} from "context/alumni/alumniConstants";

export const initialState = {
  alumni: null,
  isLoading: false,
  error: null,
};

export const alumniReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALUMNI_REQUEST:
      return { ...state, isLoading: true };
    case ALUMNI_SUCCESS:
      return { ...state, isLoading: false, alumni: action.payload };
    case ALUMNI_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
