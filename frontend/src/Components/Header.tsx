import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/login" className="loginBtn">
        LOGIN
      </Link>
    </header>
  );
}

export default Header;
