import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, useResolvedPath } from "react-router-dom";
import "./Browse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Genre from "./Genre";
import Book from "./Book";
import { ThemeContext } from "./context/ViewMode";
import LoadingSpinner from "./Spinner";



//BUGS
// if user types in only an author, doesnt fetch because i had
// to change the + in +inauthor:... to & so searchParams scans the query
// properly. Fix this somehow babygirl.



// 1. I need to use seartchParams to get all queries that are currently
//in the url. ++
// 2. I have all the queries in a url. Now i need to feed this query object
// to the fetchData function. Fetch function has to check if this 
// object is empty or not. If not, fetch using the quey.
export default function Browse() {
  const { mode } = useContext(ThemeContext);

  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayBooks, setDisplayBooks] = useState<JSX.Element[]>([]);
  const [bookData, setBookData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState<Form>({
    bookTitle: "",
    bookAuthor: "",
    keyword: "",
    fetchAmount: "20",
    language: "",
    genres: [],
  });
  //https://developers.google.com/books/docs/v1/using
  interface Form {
    bookTitle: string;
    bookAuthor: string;
    keyword: string;
    fetchAmount: string;
    language: string;
    genres: {}[];
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

  React.useEffect(() => {
    if (bookData.length > 0) {
      let booksArray: Book[] = bookData.map((obj) => {
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
          id: obj["etag"],
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
          return <Book key={book.id} book={book} url={URLquery} />;
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
      fetchBooks();
    }
  }, [pageNumber]);
  
  const params:Record<string,string> = {}; 
  //grabs queries from url and stores
  //in params
  searchParams.forEach((value:string, key:string) => {
    params[key] = value;
  });

  //console.log(params);

  // React.useEffect(()=>{ //tracks url
  console.log(formData.genres)

  // }, [params])
  //console.log(formData)
  const navigate = useNavigate();
  const [URLquery, setURLQuery] = useState("");
  //console.log(URLquery)
  async function fetchBooks() {
    try {
      
      
      // if(Object.keys(params).length !== 0)
      // {
        

      // }
      // else 
      // {
        
        setIsLoading(true);
          const query: string =
          formData.bookTitle !== "" ? formData.bookTitle : formData.keyword;
        const authorQuery: string =
          formData.bookAuthor !== "" ? `&inauthor=${formData.bookAuthor}` : "";
        const languageQuery: string =
          formData.language !== "" ? `&langRestrict=${formData.language}` : "";
        const response = await fetch(
          `${BASE_URL}v1/volumes?q=${query}` +
            authorQuery +
            //`+subject:${formData.genres}`+
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
    handleGenreInput();

    if (
      formData.bookTitle === "" &&
      formData.keyword === "" &&
      formData.bookAuthor === ""
     /* || formData.bookTitle === "" &&
    formData.keyword === ""*/) {
      setFormWarningCheck(true);
    } else {
      setFormWarningCheck(false);
      fetchBooks();
    }
  }


  
  

  function handleGenreInput() {
    const filteredGenresByNull = formData.genres.filter(
      (genre) => genre != null && typeof genre === "object"
    );

    const filteredGenres = filteredGenresByNull.filter((genre) => {
      const genreId = parseInt(Object.keys(genre)[0]);

      return inputComponentArray.some((item) => item.id === genreId);
    });

    setFormData((prev) => {
      return {
        ...prev,
        genres: filteredGenres,
      };
    });
  }

  const InputComponent = ({
    onDelete, //giving the component a delete function and an id
    id,
  }: {
    onDelete: () => void;
    id: number;
  }) => {
    return (
      <div className="genreInputParent">
        <input
          name={`${id}`}
          type="text"
          placeholder="Genre"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedGenres = [...formData.genres];

            updatedGenres[id] = { [e.target.name]: e.target.value };

            setFormData((prev) => ({
              ...prev,
              genres: updatedGenres,
            }));
          }}
          className="primaryInput genreInput"
        ></input>
        <button type="button" onClick={onDelete} className="deleteButton">
          <FontAwesomeIcon
            className="genreIcon"
            icon={faXmark}
            style={id === 0 ? { display: "none" } : { color: "grey" }}
            //renders user unable to delete all genre inputs
            size="lg"
          />
        </button>
      </div>
    );
  };

  ///

  //
  const [inputComponentArray, setInputComponentArray] = useState<
    { id: number; component: JSX.Element }[]
  >([
    {
      id: 0,
      //defining the array with one base input that can't be deleted
      component: (
        <InputComponent onDelete={() => handleDeleteGenre(0)} id={0} />
      ),
    },
  ]);
  const [inputID, setInputID] = React.useState(1);

  function addGenre() {
    const atLeastOneInputEmpty = inputComponentArray.some(
      ({ id }) =>
        formData.genres[id] === undefined || formData.genres[id] === ""
    );

    if (!atLeastOneInputEmpty) {
      setBadInput((prev) => false);
      const newInputID = inputID + 1; // Capture the current value of inputID
      setInputID(newInputID);
      //setInputID((prev) => prev + 1);
      setInputComponentArray((prev) => [
        ...prev,
        {
          id: newInputID,
          component: (
            <InputComponent
              onDelete={() => handleDeleteGenre(newInputID)}
              id={newInputID}
            />
          ),
        },
      ]);
    } else {
      setBadInput((prev) => true);
    }
  }
  const [badInput, setBadInput] = useState<boolean>(false);
  const warningText: JSX.Element = (
    <p className="warningText">*Please fill out all current genre boxes!</p>
  );
  function handleDeleteGenre(id: number) {
    setInputComponentArray((prev) => prev.filter((item) => item.id !== id));
  }
  const [advancedSearchIsOpen, setAdvancedSearchIsOpen] =
    useState<boolean>(true);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  ///

  function handleSelectedGenres(selectedGenres: string[]) {
    setSelectedGenres(selectedGenres);
  }
  let selectedGenresString = selectedGenres.join(", ");

  async function handleFilterSearch() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}v1/volumes?q=${selectedGenresString}` +
          `&maxResults=20` +
          `&key=${API_KEY}`
      );
      const data = await response.json();
      setBookData(data.items);
      setIsLoading(false);
      setIsAdvancedSearch(false);
      window.scrollTo(0, 750);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  return (
    <main id={mode}>
      <div className="browseBody">
        <h2>
          Find a book or two that you have liked previously, add it to your
          favourited list and we will offer you something similar!
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
                <div className="genresContainer">
                  <div className="genresWrap">
                    <label className="aaa">Genres</label>
                    <div className="renderedInputs">
                      {inputComponentArray.map(({ id, component }) => (
                        <div key={id}>{component}</div>
                      ))}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    type="button"
                    onClick={addGenre}
                    className="plusIcon"
                    icon={faPlus}
                    style={{ color: "#ffffff" }}
                  />
                </div>
                {badInput && warningText}
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
