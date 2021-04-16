import setAuthToken from "../../utils/setAuthToken";
import {
  LOGOUT,
  USER_LOADED_SUCCESS,
} from "../actions/types";

export const userSetRedux=(user)=>async(dispatch) =>{
  const token = "Bearer " + user.message;
  
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);
  dispatch({
    type: USER_LOADED_SUCCESS,
    payload: user,
  });
}
export const logout = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(null);
  return {
    type: LOGOUT,
  };
};
