import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom"

export default function About() {
  return (
    <main>
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
              genres or specific books that you have liked, and allow us to do
              the rest!
            </li>
            <li>
              You can browse without signing up, but if you would like to
              favorite and save your choices, click the 'Sign Up' button below!
            </li>
          </ul>
          <div className="buttonContainer">
            <Link to="/BookLook/browse" className="primaryButton">
              Browse
              <FontAwesomeIcon
                icon={faArrowUp}
                className="primaryButtonArrow arrowUp"
              />
            </Link>
            <Link to="/BookLook/" className="primaryButton">
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
