import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import profileLogo from "./Icons/user-circle-dark.png";
import { ThemeContext } from "./context/ViewMode";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const currentLocation: string = useLocation().pathname;

  const { mode, toggle } = useContext(ThemeContext);

  return (
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
            <img className="profileLogo" src={profileLogo} alt="Profile"></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item  href="/#/login"className="DropdownMenu">
              Account
            </Dropdown.Item>
            <Dropdown.Item  href="/#/register"className="DropdownMenu">
              Register
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" className="DropdownMenu">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}
