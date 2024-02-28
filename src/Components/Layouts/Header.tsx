import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import profileLogo from "../Icons/user-circle-dark.png";
import { ThemeContext } from "../context/ViewMode";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../../config/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { JsxAttribute } from "typescript";

export default function Header() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const currentLocation: string = useLocation().pathname;

  const { mode, toggle } = useContext(ThemeContext);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };


  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const LoggedInDropdownMenu: any = (
    <Dropdown.Item href="/login" onClick={logout} className="DropdownMenu">
      Log Out
    </Dropdown.Item>
  );

  const LoggedOutDropdownMenu: any = (
    <Dropdown.Item href="/login" className="DropdownMenu">
      Login
    </Dropdown.Item>
  );

  const user = auth.currentUser;

  return (
    <div>
      {matches && (
        <header className={`header${mode}`}>
          <Link to="/" className={`logo head${mode}`}>
            <p>BOOK</p>
            <p>LOOK</p>
          </Link>
          <nav>
            <Link
              to="/"
              className={
                currentLocation === "/"
                  ? `link active${mode} link${mode}`
                  : `link link${mode}`
              }
            >
              Home
            </Link>
            <Link
              to="/about"
              className={
                currentLocation === "/about"
                  ? `link active${mode} link${mode}`
                  : `link link${mode}`
              }
            >
              About
            </Link>
            <Link
              to="/browse"
              className={
                currentLocation === "/browse"
                  ? `link active${mode} link${mode}`
                  : `link link${mode}`
              }
            >
              Browse
            </Link>
            <Link
              to="/favourites"
              className={
                currentLocation === "/favourites"
                  ? `link active${mode} link${mode}`
                  : `link link${mode}`
              }
            >
              Favourites
            </Link>
          </nav>
          <div className="rightSideNavigation">
            <div className="displayMode">
              <button className="displayButton" onClick={toggle}>
                <FontAwesomeIcon
                  icon={faSun}
                  size="lg"
                  style={{ color: mode === "light" ? "#ffffff" : "#191418" }}
                />
                <FontAwesomeIcon
                  icon={faMoon}
                  size="lg"
                  style={{ color: mode === "light" ? "#191418" : "#ffffff" }}
                />
              </button>
            </div>
            <Dropdown id="dropDown">
              <Dropdown.Toggle className="DropdownButton" variant="none">
                <img
                  className="profileLogo"
                  src={profileLogo}
                  alt="Profile"
                ></img>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {user ? LoggedInDropdownMenu : LoggedOutDropdownMenu}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
      )}
      {!matches && (
        <header className={`header${mode}`}>
          <Link to="/" className={`logo head${mode}`}>
            <p>BOOK</p>
            <p>LOOK</p>
          </Link>
          <div className="rightSideNavigation">
            <div className="displayMode">
              <button className="displayButton" onClick={toggle}>
                <FontAwesomeIcon
                  icon={faSun}
                  size="lg"
                  style={{ color: mode === "light" ? "#ffffff" : "#191418" }}
                />
                <FontAwesomeIcon
                  icon={faMoon}
                  size="lg"
                  style={{ color: mode === "light" ? "#191418" : "#ffffff" }}
                />
              </button>
            </div>
            <Dropdown id="dropDown">
              <Dropdown.Toggle className="DropdownButton" variant="none">
                <img
                  className="profileLogo"
                  src={profileLogo}
                  alt="Profile"
                ></img>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/" className="DropdownMenu">
                  Home
                </Dropdown.Item>
                <Dropdown.Item href="/about" className="DropdownMenu">
                  About
                </Dropdown.Item>
                <Dropdown.Item href="/browse" className="DropdownMenu">
                  Browse
                </Dropdown.Item>
                <Dropdown.Item href="/favourites" className="DropdownMenu">
                  Favourites
                </Dropdown.Item>
                {user ? LoggedInDropdownMenu : LoggedOutDropdownMenu}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </header>
      )}
    </div>
  );
}
