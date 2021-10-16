import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="mix Tanzanite col-lg-3 col-md-4 col-sm-6">
      <div className="mixBack">
        <div className="mixBacImage">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="mixlebal">
          <div className="mixLebalIcon">
            <i className="fas fa-heart"></i>
          </div>
          <Link to={`products/${product._id}`}>
            <div className="mixLebalIcon">
              {" "}
              <i className="fas fa-retweet"></i>
            </div>
          </Link>
        </div>
      </div>
      <div className="mixtext">
        <p>
          <Link to={`products/${product._id}`}>{product.name}</Link>
        </p>
        <h3>${product.price}</h3>
      </div>
    </div>
  );
}

export default Product;
