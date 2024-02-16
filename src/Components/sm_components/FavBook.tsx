import "./Book.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ViewMode";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function FavBook(props: any) {
  const { mode } = useContext(ThemeContext);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
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
    favourite,
    id,
  } = props.book;

  let imageSource = "https://pictures.abebooks.com/isbn/9780465018369-uk.jpg";
  if (imageLinks !== undefined) {
    imageSource = imageLinks["thumbnail"];
  }

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
  function handleFavouriteDelete() {
    props.handleClick(props.book);
  }
  let shortenedDescription = truncateDescription(description, 200);
  return (
    <section>
      {matches && (<div key={id} className={`bookElement background${mode}`}>
        <div className="bookImage">
          <img src={imageSource} alt="" className="bookImg" />
        </div>
        <div className="bookText">
          <Link
            to={`../browse/${id}`}
            state={{ book: props.book, url: props.url }}
            className="bookTitle"
          >
            {title}
          </Link>
      <p>{id}</p>
          <p>{subtitle}</p>
          <p className="author">{authors}</p>
          <p>{shortenedDescription}</p>
          <p>{avgRating !== undefined ? `rating: ${avgRating}/5` : ""}</p>
          <button
            onClick={handleFavouriteDelete}
            className={`primaryButton button${mode} smallButton`}
          >
            Unfavourite
          </button>
        </div>
      </div>)}
      {!matches && (<div key={id} className={`bookElement background${mode}`}>
        <div>
          <div className="bookImage">
            <img src={imageSource} alt="" className="bookImg" />
          </div>
          <div className="bookText">
            <Link
              to={`../browse/${id}`}
              state={{ book: props.book, url: props.url }}
              className="bookTitle"
            >
              {title}
            </Link>
                <p>{id}</p>
            <p>{subtitle}</p>
            <p className="author">{authors}</p>
            <p>{shortenedDescription}</p>
            <p>{avgRating !== undefined ? `rating: ${avgRating}/5` : ""}</p>
            <button
              onClick={handleFavouriteDelete}
              className={`primaryButton button${mode} smallButton`}
            >
              Unfavourite
            </button>
          </div>
                </div>
        </div>)}
    </section>
  );
}
