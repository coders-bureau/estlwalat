import * as types from "./ActionTypes";
import axios from "axios";

export const login = (logout) => (dispatch) => {
  dispatch({ type: types.GET_LOGIN_REQUEST });

  try {
    logout == "logout"
      ? dispatch({ type: types.GET_LOGOUT_SUCCESS })
      : dispatch({ type: types.GET_LOGIN_SUCCESS });
  } catch (error) {
    dispatch({ type: types.GET_LOGIN_FAILURE });
  }
};

export const userloginStatus = () => async (dispatch) => {
  dispatch({ type: types.GET_LOGIN_REQUEST });
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API}/user/profile/details`
    );
    console.log(response);
    if (response) dispatch({ type: types.GET_LOGIN_SUCCESS });
    
  } catch (error) {
    console.log("error", error);
    dispatch({ type: types.GET_LOGIN_FAILURE });
    // localStorage.clear();
  }
};
// localStorage.setItem("username",JSON.stringify(payload.name))
// localStorage.setItem("isAuth",JSON.stringify(true))
