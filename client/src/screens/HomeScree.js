import React, { useEffect } from "react";
import Product from "../components/product/product";
import MessageBox from "../components/boxes/MessageBox";
import LoadingBox from "../components/boxes/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/action/productAction";

function HomeScreen(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="article">
        <h2>Featured Product</h2>
        <div className="allMixer">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="mixercontainer">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
