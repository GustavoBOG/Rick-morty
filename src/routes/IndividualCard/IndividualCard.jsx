import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCharacterById } from '../FetchApi/FetchApi';
import './IndividualCard.css';

function IndividualCard() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCharacter() {
            const data = await fetchCharacterById(id);
            setCharacter(data);
        }
        
        fetchCharacter();
    }, [id]);

    if (!character) return <div>Loading...</div>;

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
        <div className="individual-card-container"> 
        <div className='back-arrow' onClick={() => navigate(-1)}>&#x2B05;</div>
            <div className="character-card">
                <img src={character.image} alt={character.name} />
                <h2>{character.name}</h2>
                <p>
                    Status: {character.status} {getStatusIndicator(character.status)}
                </p>
                <p>Species: {character.species}</p>
                <p>Gender: {character.gender}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Location: {character.location.name}</p>
            </div>
        </div>
    );
}

export default IndividualCard;


