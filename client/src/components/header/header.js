import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <header>
      <div className="nav">
        <div className="logo">
          <Link to="/">
            <img src="./images/logo2.png" alt="" />
          </Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/" id="MenuActive">
                home
              </Link>
            </li>
            <li>
              <Link to="/shop">shop</Link>
            </li>
            <li>
              <Link to="/blog">blogs</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <div className="users">
            {userInfo ? (
              <>
                <Link to="/">
                  <i className="fa fa-user"></i>
                </Link>
                <span>{userInfo.name}</span>
              </>
            ) : (
              <Link to="/signin">
                <i className="fa fa-user"></i>
              </Link>
            )}
          </div>
          <div className="shops">
            <Link to="/cart">
              <i className="fa fa-shopping-bag">
                {cartItems.length > 0 && <span>{cartItems.length}</span>}
              </i>
            </Link>
            <div className="buttonsPrice">
              item: ({cartItems.reduce((a, c) => a + c.qty, 0)})
              <span>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
