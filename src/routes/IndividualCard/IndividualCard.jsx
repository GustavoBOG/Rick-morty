// IndividualCard.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../FetchApi/FetchApi';

function IndividualCard() {
    const { id } = useParams(); // Obtiene el ID de la URL
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        async function fetchCharacter() {
            const data = await fetchCharacterById(id);
            setCharacter(data);
        }
        
        fetchCharacter();
    }, [id]); // Dependencia del ID para recargar los datos si cambia

    if (!character) return <div>Loading...</div>;

    return (
        <>
        <div className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Location: {character.location.name}</p>
        </div>
        </>
    );
}

export default IndividualCard;


