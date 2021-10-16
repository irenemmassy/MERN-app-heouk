import Axios from "axios";
import {
  CART_ADD_ITERM,
  CART_REMOVE_ITERM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITERM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInstock: data.countInstock,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (productId) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITERM,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
