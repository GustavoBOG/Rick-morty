import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header() {

  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src="/logo.png" alt="Rick & Morty Logo" className="logo" />
          </Link>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/list">Lista de Personajes</Link>
            </li>
            <li className="search-li">
              <SearchBar />
            </li>
            <li>
              <button
                type="submit"
                form="search-form"
                className="search-toggle"
              >
                <span className="search-icon">🔍</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
