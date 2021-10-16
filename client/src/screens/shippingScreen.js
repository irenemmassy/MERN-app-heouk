import React, { useState } from "react";
import { saveShippingAddress } from "../redux/action/cartAction";
import { useDispatch, useSelector } from "react-redux";

function ShippingScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [country, setCountry] = useState(shippingAddress.country);
  const [city, setCity] = useState(shippingAddress.city);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [address, setAddress] = useState(shippingAddress.address);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, phone, country, city, postCode, address })
    );
    props.history.push("/placeorder");
  };
  return (
    <div>
      <div className="top">
        <h2> Billing Details</h2>
        <p>
          <a href="index.html">Home</a> - <span> Billing Details</span>
        </p>
      </div>

      <div className="container">
        <div id="section">
          <div className="sectionBoxes">
            <form action="" onSubmit={submitHandler}>
              <div className="row">
                <div className="sectionInputs col-lg-12 col-md-12">
                  <div className="fistName">
                    <div className="checkout_fistName">
                      <p>
                        Full Name<span>*</span>
                      </p>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="checkout_fistName">
                      <p>
                        Phone<span>*</span>
                      </p>
                      <input
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="checkout__input">
                    <p>
                      Country<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input
                      type="text"
                      className="checkout__input__add"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="checkout__input">
                    <p>
                      Postcode / ZIP<span>*</span>
                    </p>
                    <input
                      type="text"
                      value={postCode}
                      onChange={(e) => setPostCode(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit">Continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingScreen;
