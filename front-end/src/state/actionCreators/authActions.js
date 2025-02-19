import api from "../../utils/api";
import * as actionTypes from "../actionTypes"; 

// Register User
export const register = (userData) => async (dispatch) => {
    try {
        const response = await api.post("/auth/register", userData);

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            payload: error.response?.data?.error || "Registration failed",
        });
    }
};

// Login User
export const login = (credentials) => async (dispatch) => {
    try {
        const response = await api.post("/auth/login", credentials);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: response.data,
        });
        console.log(response.data);
        alert("success");

        localStorage.setItem("token", response.data.token);
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: error.response?.data?.error || "Invalid credentials",
        });
    }
};

// Logout User
export const logout = () => (dispatch) => {
    localStorage.removeItem("token");

    dispatch({
        type: actionTypes.LOGOUT,
    });
};
