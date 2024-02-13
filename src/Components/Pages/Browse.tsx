import React, { useState, useContext, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  useResolvedPath,
} from "react-router-dom";
import "./Browse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Genre from "../sm_components/Genre";
import Book from "../sm_components/Book";
import { ThemeContext } from "../context/ViewMode";
import LoadingSpinner from "../sm_components/Spinner";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  collection,
  getCountFromServer,
  query,
  where,
  documentId,
} from "firebase/firestore";


//-----------------------
// 1. I need to use seartchParams to get all queries that are currently
//in the url. ++
// 2. I have all the queries in a url. Now i need to feed this query object
// to the fetchData function. Fetch function has to check if this
// object is empty or not. If not, fetch using the quey.
export default function Browse() {
  const { mode } = useContext(ThemeContext);

  const [userUID, setUserUID] = useState<string>();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
    }
  });

  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayBooks, setDisplayBooks] = useState<JSX.Element[]>([]);
  const [bookData, setBookData] = useState([]);
  const [isGenreSearch, setIsGenreSearch] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState<Form>({
    bookTitle: "",
    bookAuthor: "",
    keyword: "",
    fetchAmount: "20",
    language: "",
  });
  interface Form {
    bookTitle: string;
    bookAuthor: string;
    keyword: string;
    fetchAmount: string;
    language: string;
  }

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
    infoLink: string;
    favourite: boolean;
  }
  var booksArray: Book[];

  React.useEffect(() => {
    if (bookData.length > 0) {
      booksArray = bookData.map((obj) => {
        const {
          title,
          subtitle,
          authors,
          publisher,
          publishedDate,
          description,
          pageCount,
          categories,
          averageRating,
          ratingsCount,
          language,
          infoLink,
          imageLinks,
        } = obj["volumeInfo"] || {};

        return {
          id: obj["id"],
          title: title,
          subtitle: subtitle,
          authors: authors,
          publisher: publisher,
          publishedDate: publishedDate,
          description: description,
          pageCount: pageCount,
          categories: categories,
          avgRating: averageRating,
          totalRatings: ratingsCount,
          imageLinks: imageLinks,
          language: language,
          infoLink: infoLink,
          favourite: false,
        };
      });

      let displayBooks = booksArray
        .map((book) => {
          return (
            <Book
              key={book.id}
              book={book}
              url={URLquery}
              handleClick={handleFavouriteArrays}
            />
          );
        })
        .slice(0, parseInt(formData.fetchAmount));

      setDisplayBooks(displayBooks);
    }
  }, [bookData, formData.fetchAmount]);

  const API_KEY: string | undefined = process.env.REACT_APP_RAPID_API_KEY;
  const BASE_URL: string = "https://www.googleapis.com/books/";

  function handleAdvancedSearch() {
    setIsAdvancedSearch((prev) => !prev);
  }

  const [pageNumber, setPageNumber] = useState(0);

  function handlePageChange() {
    setPageNumber((prev) => prev + parseInt(formData.fetchAmount));
    window.scrollTo(0, 550);
  }
  function handlePreviousPage() {
    setPageNumber((prev) => prev - parseInt(formData.fetchAmount));
    window.scrollTo(0, 550);
  }
  React.useEffect(() => {
    if (bookData.length > 0) {
      if(isGenreSearch)
      {
        handleFilterSearch();
      }
      else 
      {
        fetchBooks();

      }
    }
  }, [pageNumber]);

  const params: Record<string, string> = {};
  //grabs queries from url and stores
  //in params
  searchParams.forEach((value: string, key: string) => {
    params[key] = value;
  });

  const navigate = useNavigate();
  const [URLquery, setURLQuery] = useState("");

  async function fetchBooks() {
    try {
      setIsGenreSearch(false);
      setIsLoading(true);
      const query: string =
        formData.bookTitle !== "" ? formData.bookTitle : formData.keyword;
      const authorQuery: string =
        formData.bookAuthor !== "" ? `inauthor=${formData.bookAuthor}` : "";
      const languageQuery: string =
        formData.language !== "" ? `&langRestrict=${formData.language}` : "";
      const response = await fetch(
        `${BASE_URL}v1/volumes?q=${query}` +
          (query !== "" ? authorQuery :  authorQuery.substring(1)) +
          `&startIndex=${pageNumber}` +
          `&maxResults=40` +
          languageQuery +
          `&key=${API_KEY}`
      );
      const data = await response.json();

      let searchQuery =
        `?q=` +
        query +
        authorQuery +
        `&startIndex=${pageNumber}` +
        languageQuery;

      setURLQuery(searchQuery);
      setTotalItems(data.totalItems);
      setBookData(data.items);
      setIsLoading(false);
      setIsAdvancedSearch(false);
      window.scrollTo(0, 550);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  React.useEffect(() => {
    navigate(`/browse${URLquery}`);
  }, [URLquery]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  const formWarning: JSX.Element = (
    <p className="warningText">*Please fill out the form for results!</p>
  );
  const [formWarningCheck, setFormWarningCheck] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (
      formData.bookTitle === "" &&
      formData.keyword === "" &&
      formData.bookAuthor === ""
      /* || formData.bookTitle === "" &&
    formData.keyword === ""*/
    ) {
      setFormWarningCheck(true);
    } else {
      setFormWarningCheck(false);
      fetchBooks();
    }
  }

  const [advancedSearchIsOpen, setAdvancedSearchIsOpen] =
    useState<boolean>(true);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function handleSelectedGenres(selectedGenres: string[]) {
    setSelectedGenres(selectedGenres);
  }
  let selectedGenresString = selectedGenres.join(", ");

  async function handleFilterSearch() {
    try {
      setIsGenreSearch(true);
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}v1/volumes?q=${selectedGenresString}` +
        `&startIndex=${pageNumber}` +
          `&maxResults=40` +
          `&key=${API_KEY}`
      );
      const data = await response.json();
      setBookData(data.items);
      setTotalItems(data.totalItems);
      setIsLoading(false);
      setIsAdvancedSearch(false);
      window.scrollTo(0, 750);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const [favouriteslist, setFavouritesList] = React.useState<List[]>([
    {
      bookid: "",
      id: "",
      uid: "",
    },
  ]);

  interface List {
    bookid: string;
    id: string;
    uid: string;
  }
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
  async function handleFavouriteArrays(book: Book) {
    try {
      if (auth.currentUser?.uid) {
        if (await bookExists(book.id, auth.currentUser.uid)) {
          console.log("this book already exists");
          const q = query(
            collection(db, "favouriteLists"),
            where("bookid", "==", book.id),
            where("uid", "==", auth.currentUser?.uid)
          );
          const querySnapshot = await getDocs(q);
          let documentId;
          querySnapshot.forEach((doc) => {
            documentId = doc.id;
          });
          if (documentId) {
            await deleteDoc(doc(db, "favouriteLists", documentId));
          }
        } else {
          await addDoc(collection(db, "favouriteLists"), {
            bookid: book.id,
            uid: auth.currentUser?.uid,
          });
        }
      } else {
        console.log("user isn't logged in");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main id={mode}>
      <div className="browseBody">
        <h2>
          Find a book or two that you have liked previously or would like to read and add it to your
          favourited list!
        </h2>
        <div className="searchContainer">
          <div className="links">
            <button
              className={
                advancedSearchIsOpen
                  ? `linkHover currentlyOpen${mode}`
                  : `linkHover${mode}`
              }
              onClick={() => setAdvancedSearchIsOpen(true)}
            >
              I know what books i like
            </button>
            <button
              className={
                !advancedSearchIsOpen
                  ? `linkHover currentlyOpen${mode}`
                  : `linkHover${mode}`
              }
              onClick={() => setAdvancedSearchIsOpen(false)}
            >
              I would like some guidance
            </button>
          </div>
          {advancedSearchIsOpen && (
            <form onSubmit={handleSubmit} className={`formContainer${mode}`}>
              <div className="titleContainer">
                <div className="titleInput">
                  <label htmlFor="bookTitle">Book title</label>
                  <input
                    id="bookTitle"
                    className="primaryInput"
                    type="text"
                    name="bookTitle"
                    placeholder="Book title"
                    value={formData.bookTitle}
                    onChange={handleChange}
                  />
                  {formWarningCheck && !isAdvancedSearch ? formWarning : ""}
                </div>

                <button disabled={isAdvancedSearch ? true : false}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "#ffffff" }}
                    size="xl"
                  />
                </button>
                <button
                  id="advancedSearch"
                  type="button"
                  onClick={handleAdvancedSearch}
                >
                  Advanced Search
                  <FontAwesomeIcon
                    className="arrow"
                    icon={isAdvancedSearch ? faChevronUp : faChevronDown}
                    size="xs"
                    style={{ color: mode === "dark" ? "#ffffff" : "#3f3939" }}
                  />
                </button>
              </div>

              <div
                className={
                  isAdvancedSearch ? "advancedSearch" : "advancedSearch hidden"
                }
              >
                <div className="topFormContainer">
                  <div className="authorKeywordContainer">
                    <label htmlFor="author">Book author</label>
                    <input
                      id="author"
                      className="primaryInput"
                      type="text"
                      name="bookAuthor"
                      placeholder="Book author"
                      value={formData.bookAuthor}
                      onChange={handleChange}
                    />
                    <label htmlFor="keyw">Keyword</label>
                    <input
                      id="keyw"
                      className="primaryInput"
                      type="text"
                      name="keyword"
                      placeholder="Keyword"
                      value={formData.keyword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formLangContainer">
                    <label htmlFor="lang">Language</label>
                    <select
                      id="lang"
                      className="primaryInput"
                      name="language"
                      // id="data"
                      value={formData.language}
                      onChange={handleChange}
                    >
                      <option className="selectOption" value="All">
                        All Languages
                      </option>
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                      <option value="zh">Chinese</option>
                      <option value="da">Danish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="la">Latin</option>
                      <option value="lt">Lithuanian</option>
                      <option value="pl">Polish</option>
                      <option value="ru">Russian</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>

                {formWarningCheck && isAdvancedSearch ? formWarning : ""}
                <button className={`primaryButton formButton button${mode}`}>
                  Search
                </button>
              </div>
            </form>
          )}

          {!advancedSearchIsOpen && (
            <section>
              <div className={`formContainer${mode} two`}>
                <p>What do you look for in a book?</p>
                <Genre onSelection={handleSelectedGenres} />
                <button
                  onClick={handleFilterSearch}
                  className={`primaryButton formButton button${mode}`}
                >
                  Search
                </button>
              </div>
              {/* {filterElements} */}
            </section>
          )}
          {bookData.length > 0 && (
            <div className="totalResults">
              <div className="results">
                <p>Results per page: </p>
                <select
                  className="fetchAmount"
                  name="fetchAmount"
                  value={formData.fetchAmount}
                  onChange={handleChange}
                >
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
              <p>Total results: {totalItems}</p>
            </div>
          )}
          {isLoading ? <LoadingSpinner /> : displayBooks}
          {bookData.length > 0 && (
            <div className="pageTurnButton">
              {pageNumber !== 0 ? (
                <button
                  className={`primaryButton previousPageButton page${mode}`}
                  onClick={handlePreviousPage}
                >
                  Previous Page
                </button>
              ) : (
                ""
              )}
              <button
                className={`primaryButton nextPageButton page${mode}`}
                onClick={handlePageChange}
              >
                Next Page
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
