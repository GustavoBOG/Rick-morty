import { Link } from "react-router-dom";

function Card({ character }) {
    return (
        <Link to={`/character/${character.id}`} className="character-card">
        <img src={character.image} alt={character.name} />
        <h2>{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
      </Link>
    );
  }
  
  export default Card;