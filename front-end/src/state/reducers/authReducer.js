import * as actionTypes from "../actionTypes"; 

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user || null,
                token: action.payload.token,
                isAuthenticated: true,
                error: null,
            };

        case actionTypes.REGISTER_FAIL:
        case actionTypes.LOGIN_FAIL:
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;
