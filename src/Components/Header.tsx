import { Link } from "react-router-dom"
import "./Header.css"
import profileLogo from "./Icons/user-circle-dark.png";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  return (
    <header>
      <Link to="/BookLook" className="logo" >
        <p>BOOK</p>
        <p>LOOK</p>
      </Link>
      <nav>
        <Link to="/BookLook" className="link">
          Home
        </Link>
        <Link to="/BookLook/about" className="link">
          About
        </Link>
        <Link to="/BookLook/browse" className="link">
          Browse
        </Link>
        <Link to="/BookLook" className="link">
          Favourites
        </Link>
      </nav>
      <div className="rightSideNavigation">
        <div className="displayMode">
          <button>Light Dark</button>
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
