import {
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  authError: null,
  token:null,
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    //userloaded
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        authError: null,
        token:payload.message,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    //logout
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        validationErrors: null,
        token:null,
      };

    default:
      return state;
  }
};
export default authReducer;
