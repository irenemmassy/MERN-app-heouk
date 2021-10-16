import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../redux/action/odrerAction";
import { ORDER_CREATE_RESET } from "../redux/constants/oredrConstant";
import MessageBox from "../components/boxes/MessageBox";
import LoadingBox from "../components/boxes/LoadingBox";

function PlaceOrder(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;

  // price calculation
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippigPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippigPrice + cart.taxPrice;
  // button
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  // useEffect
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, props.history, order, dispatch]);
  return (
    <div>
      <div className="top">
        <h2>Order Summary</h2>
        <p>
          <a href="index.html">Home</a> - <span> Order Summary</span>
        </p>
      </div>

      <div id="section">
        <div className="sectionOrder col-lg-4 col-md-6">
          <div className="checkout__order">
            <div className="checkout__order__products">
              Products <span>Total</span>
            </div>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.product}>
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                  <span>${item.qty * item.price}</span>
                </li>
              ))}
            </ul>
            <div className="checkout__order__subtotal">
              Tax<span>${cart.taxPrice}</span>
            </div>
            <div className="checkout__order__subtotal">
              Shipping Price<span>${cart.shippigPrice}</span>
            </div>
            <div className="checkout__order__total">
              Total <span>${cart.totalPrice}</span>
            </div>
            <button
              type="submit"
              className="site-btn"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
            >
              PLACE ORDER
            </button>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
