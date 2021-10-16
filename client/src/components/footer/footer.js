import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer>
      <div className="container">
        <div className="footerInside">
          <div className="footerNav">
            <p>
              <Link to="/">Home</Link>
            </p>
            <p>
              <Link to="/contact">contact us</Link>
            </p>
            <p>
              <Link to="/shop">shop</Link>
            </p>
          </div>
          <div className="footerNav">
            <p>
              <Link to="/cart">shopping cart</Link>
            </p>
            <p>
              <Link to="/blog">blog details</Link>
            </p>
            <p>
              <Link to="/blog">blogs</Link>
            </p>
          </div>
          <div className="send-email">
            <p>you need news?</p>
            <p>send email</p>
            <p> for newsletter</p>
            <p>you need news?</p>
          </div>
          <div className="footerMedia">
            <p>certification & alliences </p>
            <div className="footerMediaImg">
              <img
                src="https://funmasteracademy.com/wp-content/uploads/2018/05/iso-9001-1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
