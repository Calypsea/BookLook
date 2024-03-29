import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ViewMode";
import { useParams, useLocation, Link } from "react-router-dom";

import "./BookDetail.css";

interface Book {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string[];
  avgRating: number;
  totalRatings: number;
  imageLinks: {};
  language: string;
  favourite: boolean;
}
export default function BookDetail() {
  const { mode } = useContext(ThemeContext);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const [showMore, setShowMore] = React.useState(false);

  let { state } = useLocation();
  const book = state?.book;
  const url = state?.url;

  if (!book) {
    return (
      <main id={mode} className="error">
        <h1>Oops! Something went wrong.</h1>
        <p>Book information not available.</p>
      </main>
    );
  }
  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    avgRating,
    totalRatings,
    imageLinks,
    language,
    infoLink,
    favourite,
    id,
  } = book;

  function truncateDescription(
    str: string | undefined,
    length: number
  ): string {
    if (str !== undefined) {
      if (str.length > length) {
        return str.slice(0, length) + "...";
      } else {
        return str;
      }
    } else {
      return "";
    }
  }
  let shortenedDescription = truncateDescription(description, 500);

  return (
    <div id={mode}>
      {matches && (
        <main className={`bookDetails`} id={mode}>
          <div className="bookLeftColumn">
            <img className="bookImg bookDetailImg" src={imageLinks.thumbnail} />

            {infoLink !== "" ? (
              <a
                href={infoLink}
                target="_blank"
                className={`primaryButton button${mode}`}
              >
                Book on Google
              </a>
            ) : (
              <p></p>
            )}
          </div>
          <section className="bookRightColumn">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <p>{authors}</p>
            <p className="bold">
              {publisher ? `Published by: ${publisher}` : ""}
            </p>
            <p>{avgRating ? `Average rating: ${avgRating}/5` : ""}</p>
            <p>{totalRatings ? `Total ratings: ${totalRatings}` : ""}</p>
            <article>
              {showMore ? description : shortenedDescription}
              <button
                onClick={() => {
                  setShowMore((prev) => !prev);
                }}
                className={`showButton`}
                id={mode}
              >
                {showMore ? " Show less" : " Show more"}
              </button>
            </article>
            <p>{language ? `Book language: ${language}` : ""}</p>
            <p>{pageCount ? `Page count: ${pageCount}` : ""}</p>
            <p>
              {publishedDate
                ? `Published on: ${publishedDate} ${
                    publisher ? `by ${publisher}` : ""
                  }`
                : ""}
            </p>
          </section>
        </main>
      )}
      {!matches && (
        <main className="mainMobile" id={mode}>
          <div className="bookLeftColumn">
            <img className="bookImg bookDetailImg" src={imageLinks.thumbnail} />

            {infoLink !== "" ? (
              <a
                href={infoLink}
                target="_blank"
                className={`primaryButton button${mode} mobileButton`}
              >
                Book on Google
              </a>
            ) : (
              <p></p>
            )}
          </div>
          <section className="bookRightColumn">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <p>{authors}</p>
            <p className="bold">
              {publisher ? `Published by: ${publisher}` : ""}
            </p>
            <p>{avgRating ? `Average rating: ${avgRating}/5` : ""}</p>
            <p>{totalRatings ? `Total ratings: ${totalRatings}` : ""}</p>
            <article>
              {showMore ? description : shortenedDescription}
              <button
                onClick={() => {
                  setShowMore((prev) => !prev);
                }}
                className={`showButton`}
                id={mode}
              >
                {showMore ? " Show less" : " Show more"}
              </button>
            </article>
            <p>{language ? `Book language: ${language}` : ""}</p>
            <p>{pageCount ? `Page count: ${pageCount}` : ""}</p>
            <p>
              {publishedDate
                ? `Published on: ${publishedDate} ${
                    publisher ? `by ${publisher}` : ""
                  }`
                : ""}
            </p>
          </section>
        </main>
      )}
    </div>
  );
}
