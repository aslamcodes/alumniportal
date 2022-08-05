import {
  ALUMNI_FAILURE,
  ALUMNI_REQUEST,
  ALUMNI_SUCCESS,
} from "./alumniConstants";
import axios from "axios";

export const applyAsAlumni = async (dispatch, payload) => {
  dispatch({ type: ALUMNI_REQUEST });
  try {
    const { data } = await axios.post("/api/v1/alumni/register", payload);
    dispatch({ type: ALUMNI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUMNI_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAlumni = async (dispatch, payload) => {
  dispatch({ type: ALUMNI_REQUEST });
  try {
    const { data } = await axios.get(`/api/v1/alumni/${payload.user}`);
    dispatch({ type: ALUMNI_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALUMNI_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
