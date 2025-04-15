import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        try {
          const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${query}`);
          const data = await res.json();
          
          if (data && data.results) {
            setSuggestions(data.results.slice(0, 5));
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        } catch (error) {
          console.error("Error buscando:", error);
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const clearSearch = () => {
    setQuery('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/list?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false); // opcional: cerrar sugerencias
    }
  };

  return (
    <form className="searchbar-wrapper" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar personajes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <button type="button" className="clear-button" onClick={clearSearch}>
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-container" ref={suggestionsRef}>
          <ul className="suggestions-list">
            {suggestions.map((character) => (
              <li key={character.id} className="suggestion-item">
                <Link to={`/character/${character.id}`} className="suggestion-link">
                  <img src={character.image} alt={character.name} className="suggestion-image" />
                  <div className="suggestion-info">
                    <span className="suggestion-name">{character.name}</span>
                    <span className="suggestion-species">{character.species}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
