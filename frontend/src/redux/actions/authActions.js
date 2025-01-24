import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { API_CONFIG } from "../../config";

export const registerUser = (userData, navigate) => async (dispatch) => {
  try {
    const newUser = await axios.post("/users/register", userData, {
      ...API_CONFIG,
    });
    if (newUser) navigate("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const user = await axios.post("/users/login", userData, { ...API_CONFIG });
    // Get the token
    const { token } = user.data;
    // Save the token in localStorage
    localStorage.setItem("jwtToken", token);
    // Set token to Authentication header
    setAuthToken(token);
    // Get the user by the token
    const userDecoded = jwtDecode(token);
    // Set current user
    dispatch(setCurrentUser(userDecoded));
    return Promise.resolve();
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    return Promise.reject();
  }
};

export const setCurrentUser = (userDecoded) => ({
  type: SET_CURRENT_USER,
  payload: userDecoded,
});

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header
  setAuthToken(false);
  // Set user to {}
  dispatch(setCurrentUser({}));
};
