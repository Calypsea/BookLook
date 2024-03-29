import React, { useContext } from "react";
import "./HomeBody.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../context/ViewMode";
import { Link } from "react-router-dom";

export default function HomeBody() {
  const { mode } = useContext(ThemeContext);

  return (
    <main id={mode}>
      <section>
        <div className="homePageHeader">
          <h1>Can't decide whether you should read a book?</h1>
          <p>Look up a genre or a book, read it's summary, all in one place!</p>

          <Link
            to="/browse"
            className={`primaryButton buttonLink button${mode} `}
          >
            Explore More!
            <FontAwesomeIcon
              icon={faArrowRight}
              className="primaryButtonArrow"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
