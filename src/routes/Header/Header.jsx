
import { Link } from "react-router-dom";
import './Header.css';
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/"><h1>Home</h1></Link>
          </li>
          <li>
            <Link to="/list">Lista de Personajes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
