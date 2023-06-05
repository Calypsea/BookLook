import "./Browse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function Browse() {
  return (
    <main>
      <div className="browseBody">
        <h2>
          Find a book or two that you have liked previously, add it to your
          favourited list and we will offer you something similar!
        </h2>
        <div className="searchContainer">
          <div className="links">
            <a href="/">I know what books i like</a>
            <a href="/">I would like some guidance</a>
          </div>
          <form className="formContainer">
            <div className="titleContainer">
              <div className="titleInput">
                <label htmlFor="bookTitle">Book title</label>
                <input
                  className="primaryInput"
                  type="text"
                  name="bookTitle"
                  placeholder="Book title"
                />
              </div>
              <FontAwesomeIcon
                className="searchIcon"
                icon={faMagnifyingGlass}
                style={{ color: "#ffffff" }}
                size="xl"
              />
              <button>
                Advanced Search
                <FontAwesomeIcon
                  className="arrow"
                  icon={faChevronDown}
                  size="xs"
                  style={{ color: "#ffffff" }}
                />
                {/* <FontAwesomeIcon
                  className="arrow"
                  icon={faChevronUp}
                  size="xs"
                  style={{ color: "#ffffff" }}
                /> */}
              </button>
            </div>

            <div className="advancedSearch">
              <div className="topFormContainer">
                <div className="authorKeywordContainer">
                  <label htmlFor="bookAuthor">Book author</label>
                  <input
                    className="primaryInput"
                    type="text"
                    name="bookAuthor"
                    placeholder="Book author"
                  />
                  <label htmlFor="keyword">Keyword</label>
                  <input
                    className="primaryInput"
                    type="text"
                    name="keyword"
                    placeholder="Keyword"
                  />
                </div>
                <div className="formLangContainer">
                  <label htmlFor="language">Language</label>
                  <select className="primaryInput" name="lanugage" id="data">
                    <option className="selectOption" value="All">
                      All Languages{" "}
                    </option>
                    <option value="French">French</option>
                    <option value="French">Automate this</option>
                  </select>
                </div>
              </div>
              <div className="genresContainer">
                <div className="genresWrap">
                  <label htmlFor="genre">Genres</label>
                  <input
                    className="primaryInput genreInput"
                    type="text"
                    name="genre"
                    placeholder="Fantasy"
                  />
                </div>
                <FontAwesomeIcon
                  className="plusIcon"
                  icon={faPlus}
                  style={{ color: "#ffffff" }}
                />
              </div>
            </div>
            <button className="primaryButton formButton">
              Search
            </button>
          </form>


          {/* //////// */}
          <section>
            <p>What do you look for in a book?</p>
          </section>
        </div>
      </div>
    </main>
  );
}
