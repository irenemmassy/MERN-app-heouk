import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/boxes/LoadingBox";
import MessageBox from "../components/boxes/MessageBox";
import { SignIn } from "../redux/action/userAction";

function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SignIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="signin">
      <form className="form">
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <input
          placeholder="Your Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Your Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={submitHandler}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignInScreen;
