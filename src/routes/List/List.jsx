import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../Card/Card';
import { fetchCharacters } from '../FetchApi/FetchApi';
import './List.css';

function List() {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // MOSTRAR EN LA URL EL NUMEOR DE LA PAG
  const pageParam = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  // CARGA DE PJs
  const loadCharacters = async (page) => {
    const data = await fetchCharacters(page);
    setCharacters(data.results);
    setTotalPages(data.info.pages)
  };

  // CAMBIARA LOS PJs cuando cambie la pag
  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`?page=${page}`);
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
        {characters.map((character) => (
          <li key={character.id} className="character-item">
            <Card character={character} />
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default List;
