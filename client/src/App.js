import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScree";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrder from "./screens/PlaceOrder";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import ShippingScreen from "./screens/shippingScreen";
import SignInScreen from "./screens/SignInScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Header />
        </div>

        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/products/:id" component={ProductDetailScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
