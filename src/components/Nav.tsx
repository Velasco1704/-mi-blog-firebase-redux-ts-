import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "@features/currentUserSlice";
import { AiOutlinePoweroff } from "react-icons/ai";
import "@styles/Nav.scss";

export const Nav = () => {
  const dispatch = useDispatch();
  return (
    <nav className="nav__container">
      <NavLink className="nav__link logo" to="/">
        My<span className="nav__span">BLOG</span>
      </NavLink>
      <div className="nav__container__links">
        <NavLink className="nav__link" to="/">
          Home
        </NavLink>
        <NavLink className="nav__link" to="/add-post">
          Public
        </NavLink>
        <NavLink
          onClick={() => dispatch(setLogout())}
          className="nav__link"
          to="/login"
        >
          <AiOutlinePoweroff />
        </NavLink>
      </div>
    </nav>
  );
};
