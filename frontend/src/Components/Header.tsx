import "./css/header.css";
import { Link } from "react-router-dom";
import BeatLibrary from "./BeatLibrary";

function Header() {
  return (
    <header>
      <BeatLibrary />
      <Link to="/login" className="loginBtn">
        LOGIN
      </Link>
    </header>
  );
}

export default Header;
