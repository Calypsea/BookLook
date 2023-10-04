import "./Book.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ViewMode";

export default function Book(props: any) {
  const { mode } = useContext(ThemeContext);
  const [favourited, setFavourited] = useState(false);
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
  function handleFavouriteActions()
  {
    setFavourited(prev => !prev);
    props.handleClick(props.book);
  }
  let shortenedDescription = truncateDescription(description, 200);
  return (
    <div key={id} className={`bookElement background${mode}`}>
      <div className="bookImage">
        <img src={imageSource} alt="" className="bookImg" />
      </div>
      <div className="bookText">
        <Link
          to={id}
          state={{ book: props.book, url: props.url }}
          className="bookTitle"
        >
          {title}
        </Link>

        <p>{subtitle}</p>
        <p className="author">{authors}</p>
        <p>{shortenedDescription}</p>
        <p>{avgRating !== undefined ? `rating: ${avgRating}/5` : ""}</p>
        <button
          onClick={handleFavouriteActions}
          className={`primaryButton button${mode} smallButton`}
        >
          {favourited ? `Unfavourite` : `Want to read`}
        </button>
      </div>
    </div>
  );
}
