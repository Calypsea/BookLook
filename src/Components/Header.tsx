import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import profileLogo from "./Icons/user-circle-dark.png";
import { ThemeContext } from "./context/ViewMode";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const currentLocation: string = useLocation().pathname;

  const { mode, toggle } = useContext(ThemeContext);

  return (
    <header className={`header${mode}`}>
      <Link to="/BookLook" className={`logo head${mode}`}>
        <p>BOOK</p>
        <p>LOOK</p>
      </Link>
      <nav>
        <Link
          to="/BookLook"
          className={
            currentLocation === "/BookLook"
              ? `link active${mode} link${mode}`
              : `link link${mode}`
          }
        >
          Home
        </Link>
        <Link
          to="/BookLook/about"
          className={
            currentLocation === "/BookLook/about"
              ? `link active${mode} link${mode}`
              : `link link${mode}`
          }
        >
          About
        </Link>
        <Link
          to="/BookLook/browse"
          className={
            currentLocation === "/BookLook/browse"
              ? `link active${mode} link${mode}`
              : `link link${mode}`
          }
        >
          Browse
        </Link>
        <Link
          to="/BookLook"
          className={
            currentLocation === "/BookLook/favourites"
              ? `link active${mode} link${mode}`
              : `link link${mode}`
          }
        >
          Favourites
        </Link>
      </nav>
      <div className="rightSideNavigation">
        <div className="displayMode">
          <button className="displayButton" onClick={toggle}>
            <FontAwesomeIcon
              icon={faSun}
              size="lg"
              style={{ color: mode === "light" ? "#ffffff" : "#191418" }}
            />
            <FontAwesomeIcon
              icon={faMoon}
              size="lg"
              style={{ color: mode === "light" ? "#191418" : "#ffffff" }}
            />
          </button>
        </div>
        <Dropdown id="dropDown">
          <Dropdown.Toggle className="DropdownButton" variant="none">
            <img className="profileLogo" src={profileLogo} alt="Profile"></img>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" className="DropdownMenu">
              Action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" className="DropdownMenu">
              Another action
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" className="DropdownMenu">
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
}

// import "./Header.css";
// import profileLogo from "./Icons/user-circle-dark.png";
// import Dropdown from "react-bootstrap/Dropdown";

// export default function Header() {
//   return (
//     <header>
//       <a className="logo" href="https://www.google.com/">
//         <p>BOOK</p>
//         <p>LOOK</p>
//       </a>
//       <nav>
//         <a href="/" className="link">
//           Home
//         </a>
//         <a href="/" className="link">
//           About
//         </a>
//         <a href="/" className="link">
//           Browse
//         </a>
//         <a href="/" className="link">
//           Favourites
//         </a>
//       </nav>
//       <div className="rightSideNavigation">
//         <div className="displayMode">
//           <button>Light Dark</button>
//         </div>
//         <Dropdown id="dropDown">
//           <Dropdown.Toggle className="DropdownButton" variant="none">
//             <img className="profileLogo" src={profileLogo} alt="Profile"></img>
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item href="#/action-1" className="DropdownMenu">
//               Action
//             </Dropdown.Item>
//             <Dropdown.Item href="#/action-2" className="DropdownMenu">
//               Another action
//             </Dropdown.Item>
//             <Dropdown.Item href="#/action-3" className="DropdownMenu">
//               Something else
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </header>
//   );
// }
