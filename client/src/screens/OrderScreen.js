import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import { detailsOrder, payOrder } from "../redux/action/odrerAction";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../redux/constants/oredrConstant";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({
        type: ORDER_PAY_RESET,
      });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay]);

  const successPaypalHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div id="section">
        <div className="flexEx">
          <div class="sectionOrder col-lg-9 col-md-6">
            <div class="checkout__order">
              <p>
                <em>Order : {order._id}</em>
              </p>{" "}
              <br />
              <div>
                <h6>
                  <strong>Shipping</strong>
                </h6>{" "}
                <br />
                <p>
                  Name : <span>{order.shippingAddress.fullName}</span>
                </p>
                <br />
                <p>
                  Address :{" "}
                  <span>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postCode},
                    {order.shippingAddress.country}
                  </span>
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered At {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
              <div>
                <h6>
                  <strong>Payment</strong>
                </h6>
                <br />
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid At {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
              <br />
              <div class="checkout__order__products">
                Products <span>Total</span>
              </div>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.product}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                    <span>${item.qty * item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div class="sectionOrder col-lg-3 col-md-6">
            <div class="checkout__order">
              <div class="checkout__order__subtotal">
                Items<span>${order.itemsPrice}</span>
              </div>
              <div class="checkout__order__subtotal">
                Shipping <span>${order.shippigPrice}</span>
              </div>
              <div class="checkout__order__subtotal">
                Tax <span>${order.taxPrice}</span>
              </div>
              <div class="checkout__order__total">
                Order Total <span>${order.totalPrice}</span>
              </div>

              {!order.isPaid && (
                <>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaypalHandler}
                      ></PayPalButton>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
