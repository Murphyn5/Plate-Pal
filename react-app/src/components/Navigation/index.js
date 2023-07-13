import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/platepal.png";
import { useHistory } from "react-router-dom";

import SearchBar from "../SearchBar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()
  return (
    <nav className="navbar">
      <ul className="navbar-content">
        <li className="nav-left-logo">
          <NavLink exact to="/">
            <img className="logo-image" src={logo} alt="logo"></img>
          </NavLink>
        </li>
        <li className="nav-search-bar">
          <SearchBar className="search-bar-css" />
        </li>
        {isLoaded && sessionUser ? (
          <div className="nav-right-container">
            <li>
              <NavLink
                className="nav-right-add-business"
                exact
                to="/businesses/new"
              >
                Add a Business
              </NavLink>
            </li>
            <li className="nav-right-login">
              <ProfileButton className="profile-button" user={sessionUser} />
            </li>
          </div>
        ) : (
          <div className="login-signup-css">
              <button className="login-button" onClick={()=>{history.push('/login')}}>Log In</button>

              <button className="signup-button" onClick={()=>{history.push('/signup')}}>Sign Up</button>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
