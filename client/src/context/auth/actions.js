import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from "./authConstants";
import axios from "axios";

export const login = async (dispatch, { email, password }) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const { data } = await axios.post("/api/v1/users/login", {
      email,
      password,
    });
    dispatch({ type: AUTH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTH_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = () => {};
