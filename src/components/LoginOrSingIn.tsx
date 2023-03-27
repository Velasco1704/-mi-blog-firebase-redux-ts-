import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@features/currentUserSlice";
import { useNavigate } from "react-router-dom";
import { AlertError } from "./AlertError";
import { auth } from "@config/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { type PropsLoginOrSingIn } from "@interface/PropsLoginOrSingIn";
import "@styles/Form.scss";

export const LoginOrSingIn: React.FC<PropsLoginOrSingIn> = ({
  loginOrSingIn,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const handleSingUp = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        dispatch(setCurrentUser(user));
      })
      .catch((error) => {
        setError(true);
      });
  };
  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formState.email, formState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        dispatch(setCurrentUser(user));
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <form
      className="form__container"
      onSubmit={loginOrSingIn ? handleSingUp : handleLogin}
    >
      <label className="form__label">
        {loginOrSingIn ? "Create an email" : "Email"}
      </label>
      <input
        className="form__input"
        type="email"
        name="email"
        onChange={({ target }) =>
          setFormState({ ...formState, email: target.value })
        }
      />
      <label className="form__label">
        {loginOrSingIn ? "Create a password" : "Password"}
      </label>
      <input
        className="form__input"
        type="password"
        name="password"
        onChange={({ target }) =>
          setFormState({ ...formState, password: target.value })
        }
      />
      {error && <AlertError />}
      <button className="form__button" type="submit">
        {loginOrSingIn ? "Sing In" : "Login"}
      </button>
    </form>
  );
};
