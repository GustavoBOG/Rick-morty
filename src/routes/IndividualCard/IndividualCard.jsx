import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../FetchApi/FetchApi';
import './IndividualCard.css';

function IndividualCard() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function fetchCharacter() {
            const data = await fetchCharacterById(id);
            setCharacter(data);
        }
        
        fetchCharacter();
    }, [id]);

    if (!character) return <div>Loading...</div>;

    return (
        <div className="individual-card-container"> {/* Contenedor para centrar */}
            <div className="character-card">
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
                <p>Status: {character.status}</p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Location: {character.location.name}</p>
            </div>
        </div>
    );
}

export default IndividualCard;


