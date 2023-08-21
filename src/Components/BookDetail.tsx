import React, { useContext } from "react";
import { ThemeContext } from "./context/ViewMode";
import { useParams, useLocation } from "react-router-dom";
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
  //const {bookID} = useParams<{bookID:string}>()
  let { state } = useLocation();
  const book = state?.book;
  if (!book) {
    return <div>Book information not available.</div>;
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
  console.log(state);
  return (
    <div className="bookDetails">
      <div className="bookLeftColumn">
        <img className="bookImg bookDetailImg" src={imageLinks.thumbnail} />
        <button className={`primaryButton button${mode}`}> Want to read</button>
        {/* {infoLink !== "" ? <a href={infoLink} target="_blank" className={`primaryButton button${mode}`}> Book on google</a> : <p></p>} */}
      </div>

      <section className="bookRightColumn">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <p>{authors}</p>
        <p>{publisher ? `Published by: ${publisher}` : ""}</p>
        <p>{avgRating ? `Average rating: ${avgRating}` : ""}</p>
        <p>{totalRatings}</p>
        
        <article>{description}</article>
      </section>
    </div>
  );
}
