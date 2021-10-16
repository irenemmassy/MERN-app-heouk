import React from "react";

function Rating(props) {
  const { rating, numReviews } = props;
  return (
    <div className="product__details__rating">
      <i className={rating >= 1 ? "fa fa-star" : "fas fa-star-half-alt"}></i>
      <i className={rating >= 2 ? "fa fa-star" : "fas fa-star-half-alt"}></i>
      <i className={rating >= 3 ? "fa fa-star" : "fas fa-star-half-alt"}></i>
      <i className={rating >= 4 ? "fa fa-star" : "fas fa-star-half-alt"}></i>
      <i className={rating >= 5 ? "fa fa-star" : "fas fa-star-half-alt"}></i>
      <span>({numReviews} reviews)</span>
    </div>
  );
}

export default Rating;
