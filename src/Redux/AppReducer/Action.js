import * as types from "./ActionTypes.js";
import axios from "axios";

// ...............isLoading state

export const getProductsLoading = () => {
  return {
    type: types.GET_PRODUCTS_REQUEST,
  };
};

// .................................

// ...................Success state

export const getProductsSuccess = (payload) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload: payload,
  };
};
export const getProductsSuccess1 = (payload) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS1,
    payload: payload,
  };
};
// .................................

// .................isError state

export const getProductsFailure = () => {
  return {
    type: types.GET_PRODUCTS_FAILURE,
  };
};
// .......................

// api call....Success/error/loading...........

export const getProducts = (params) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    const r = await axios.get(
      `${process.env.REACT_APP_MYNTRA_API}/Products`,
      params
    );
    console.log(r.data);
    dispatch(getProductsSuccess(r.data));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};
// .......................


export const getProductsPage = (params,page) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    console.log(page);
    console.log(params);
    const r = await axios.get(
      `${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}`,params);
    console.log(r.data);
    dispatch(getProductsSuccess1(r));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};