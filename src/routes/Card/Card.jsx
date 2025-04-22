import { Link } from "react-router-dom";
import './Card.css'; // Asegúrate de tener un archivo Card.css

function Card({ character }) {
    const getStatusIndicator = (status) => {
        if (status === 'Alive') {
            return <span className="status-indicator alive"></span>;
        } else if (status === 'Dead') {
            return <span className="status-indicator dead"></span>;
        } else if (status === 'unknown') {
            return <span className="status-indicator unknown">?</span>;
        }
        return null;
    };

    return (
        <Link to={`/character/${character.id}`} className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>
                Status: {character.status} {getStatusIndicator(character.status)}
            </p>
            <p>Species: {character.species}</p>
        </Link>
    );
}

export default Card;