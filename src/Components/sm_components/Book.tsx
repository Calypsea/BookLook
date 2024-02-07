import "./Book.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ViewMode";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Book(props: any) {
  const { mode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
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
  const auth = getAuth();

  async function bookExists(bookid: string, id: string): Promise<boolean> {
    const snap = await getCountFromServer(
      query(
        collection(db, "favouriteLists"),
        where("bookid", "==", bookid),
        where("uid", "==", id)
      )
    );
    return !!snap.data().count;
  }

  const [warningMessage, setWarningMessage] = React.useState("");
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
  function handleFavouriteActions() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsFavourite((prev) => !prev);
        props.handleClick(props.book);
        setWarningMessage("");
      } else {
        setWarningMessage("You should login first!");
      }
    });
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
          state={{
            book: props.book,
            url: props.url,
            favourite: isFavourite,
            // handleFavouriteArrays: props.handleClick,
          }}
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
          {isFavourite ? `Unfavourite` : `Want to read`}
        </button>
        <p className="warningmsg">{warningMessage}</p>
      </div>
    </div>
  );
}
