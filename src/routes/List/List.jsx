import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../Card/Card';
import { fetchCharacters, searchCharactersByName } from '../FetchApi/FetchApi';
import './List.css';

function List() {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  useEffect(() => {
    const loadData = async () => {
      if (searchQuery) {
        // Modo búsqueda
        try {
          const data = await searchCharactersByName(searchQuery);
          setCharacters(data.results || []);
          setTotalPages(1); // No hay paginación real en búsqueda
        } catch (error) {
          setCharacters([]);
        }
      } else {
        // Modo lista normal paginada
        const data = await fetchCharacters(currentPage);
        setCharacters(data.results || []);
        setTotalPages(data.info.pages);
      }
    };

    loadData();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (searchQuery) {
        navigate(`?search=${encodeURIComponent(searchQuery)}&page=${page}`);
      } else {
        navigate(`?page=${page}`);
      }
    }
  };

  useEffect(() => {
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [pageParam, currentPage]);

  return (
    <div>
      <ul className="character-list">
        {characters.length > 0 ? (
          characters.map((character) => (
            <li key={character.id} className="character-item">
              <Card character={character} />
            </li>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se encontraron personajes.</p>
        )}
      </ul>

      {!searchQuery && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default List;

