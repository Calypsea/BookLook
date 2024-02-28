import React, { useContext } from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ViewMode";

export default function About() {
  const { mode } = useContext(ThemeContext);

  return (
    <main id={mode}>
      <div className="homePageHeader aboutPageHeader">
        <h1>
          Are you an avid book reader?
          <br /> Do you have trouble finding new books?
          <br /> Perhaps you would like to get into reading more often?
        </h1>
        <ul>
          <li>
            If you have answered yes to any of the above, this site is here to
            help you along your book reading journey.
          </li>
          <li>
            To get started, simply click the 'Browse' button, choose preferred
            genres or specific books that you have liked or would like to look
            up and allow us to do the rest!
          </li>
          <li>
            You can browse without signing up, but if you would like to favorite
            and save your choices, click the 'Sign Up' button below!
          </li>
        </ul>
        <div className="buttonContainer">
          <Link to="/browse" className={`primaryButton button${mode}`}>
            Browse
            <FontAwesomeIcon
              icon={faArrowUp}
              className="primaryButtonArrow arrowUp"
            />
          </Link>
          <Link to="/register" className={`primaryButton button${mode}`}>
            Sign Up
            <FontAwesomeIcon
              icon={faArrowRight}
              className="primaryButtonArrow"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
