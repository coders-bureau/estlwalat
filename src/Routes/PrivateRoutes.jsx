import axios from "axios"
import {useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import { login } from "../Redux/AuthReducer/Action";

export const PrivateRoute=({children})=>{

    const dispatch = useDispatch();

    const auth_token = localStorage.getItem("authToken");
    axios.defaults.headers.common["auth_token"] = `${auth_token}`;
    console.log(auth_token);
    if(auth_token){
    axios
      .get(`${process.env.REACT_APP_BASE_API}/user/profile/details`)
      .then((response) => {
        // setisAuth(true);
        console.log(response);
        dispatch(login());
      })
      .catch((error) => {
        // setisAuth(false);
        // console.error("Error: ", error);
        dispatch(login("logout"));
        localStorage.clear();
      });
    }else{
      dispatch(login("logout"));
      localStorage.clear();
    }

    const isAuth=useSelector((store)=>store.AuthReducer.isAuth)
    const location=useLocation()

    // const isAuth = axios.get("/profile/details")
    if(!isAuth){
        return <Navigate to={"/login"}  state={{data:location.pathname}} replace />
    }
    return children
}