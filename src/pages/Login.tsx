import { useState } from "react";
import { LoginOrSingIn } from "@components/LoginOrSingIn";
import "@styles/Login.scss";

export const Login = () => {
  const [loginOrSignUp, setLoginOrSignUp] = useState(false);
  return (
    <div className="login__container">
      <button
        className="login__button"
        type="button"
        onClick={() => setLoginOrSignUp(!loginOrSignUp)}
      >
        {loginOrSignUp ? "Login" : "Sign In"}
      </button>
      <div className="login__container__form">
        <LoginOrSingIn loginOrSingIn={loginOrSignUp} />
      </div>
    </div>
  );
};
