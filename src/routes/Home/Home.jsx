import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  funFacts  from '../../data/funFacts.js';
import './Home.css';

function Home() {
  const [randomFact, setRandomFact] = useState('');
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const getRandomFact = () => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      return funFacts[randomIndex];
    };

    setRandomFact(getRandomFact());

    const interval = setInterval(() => {
      setFadeClass(''); // resetea la animación
      setTimeout(() => {
        setRandomFact(getRandomFact());
        setFadeClass('fade-in'); // vuelve a activarla
      }, 50); // pequeño delay para reiniciar animación
    }, 20000); // cada 20 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <section className="hero">
          <h1>Rick and Morty Characters</h1>
          <h2 className="subtitle">Pickle Rick Flavor 🥒</h2>
          <p>Explora todos los personajes del multiverso, ¡desde los más geniales hasta los más... *meh*!</p>
          <Link to="/list" className="cta-button">¡Muéstramelos, Pickle Rick!</Link>
        </section>

        <section className={`fun-fact ${fadeClass}`}>
          <h3>🧠¿Sabías que...?🧠</h3>
          <p>🥒{randomFact}🥒</p>
        </section>
      </div>
    </div>
  );
}

export default Home;


