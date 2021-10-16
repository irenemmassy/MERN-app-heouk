import {
  CART_ADD_ITERM,
  CART_EMPTY,
  CART_REMOVE_ITERM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITERM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITERM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};
