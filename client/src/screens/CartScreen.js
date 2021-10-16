import React, { useEffect } from "react";
import { addToCart, removeItem } from "../redux/action/cartAction";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/boxes/MessageBox";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id));
  };
  const chekOutHandler = () => {
    props.history.push("/signin?redirec=shipping");
  };
  return (
    <>
      <div className="top">
        <h2>Cart</h2>
        <p>
          <Link to="/">Home</Link> - <span>Cart</span>
        </p>
      </div>

      <div className="container">
        <div className="section">
          <div className="sectionBox">
            <div className="cart">
              {cartItems.length === 0 ? (
                <MessageBox variant="info">
                  Cart is Empty <Link to="/">Go shopping</Link>
                </MessageBox>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div className="cartIterm" key={item.product}>
                      <div className="remove">
                        <button
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="product">
                        <div className="productImage">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div className="description">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="add">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInstock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="total">
                        <h4>${item.price}</h4>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="price">
              <p>
                Subtotal : ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                Total : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </p>
            </div>
            <div className="update-chekOut">
              <button
                onClick={chekOutHandler}
                disabled={cartItems.length === 0}
              >
                Chekout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartScreen;
