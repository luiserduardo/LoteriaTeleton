import React, { useState, useEffect } from 'react';
import CardGrid from './CardGrid';
import styles from './Loteria.module.css';

const LoteriaGame = () => {
  const [selectedCards, setSelectedCards] = useState(() => {
    const saved = localStorage.getItem('loteria-selected-cards');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentSelectedCard, setCurrentSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(() => {
    const saved = localStorage.getItem('loteria-game-started');
    return saved ? JSON.parse(saved) : false;
  });

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Guardar cartas seleccionadas
  useEffect(() => {
    localStorage.setItem('loteria-selected-cards', JSON.stringify(selectedCards));
  }, [selectedCards]);

  // Guardar estado del juego
  useEffect(() => {
    localStorage.setItem('loteria-game-started', JSON.stringify(gameStarted));
  }, [gameStarted]);

  // Cargar imágenes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://suciweb-page.glitch.me/fotos');

        if (!response.ok) {
          throw new Error('Error al cargar las imágenes');
        }

        const images = await response.json();

        const generatedCards = Array.from({ length: 100 }, (_, index) => {
          const imageIndex = index % images.length;
          return {
            id: index + 1,
            name: images[imageIndex].title || `Carta ${index + 1}`,
            image: images[imageIndex].url,
            isSelected: false,
            isBlurred: false
          };
        });

        setCards(generatedCards);
        setError(null);
      } catch (err) {
        console.error('Error al cargar las imágenes:', err);
        setError('No se pudieron cargar las imágenes. Usando imágenes por defecto.');

        const fallbackCards = Array.from({ length: 100 }, (_, index) => ({
          id: index + 1,
          name: `Carta ${index + 1}`,
          image: `./src/assets/cards/card-${((index % 3) + 1)}.jpg`,
          isSelected: false,
          isBlurred: false
        }));

        setCards(fallbackCards);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Mostrar carta ampliada solo 6 segundos
  useEffect(() => {
    if (currentSelectedCard) {
      const timeout = setTimeout(() => {
        setCurrentSelectedCard(null);
      }, 6000); // 6 segundos

      return () => clearTimeout(timeout);
    }
  }, [currentSelectedCard]);

  // Seleccionar carta
  const selectCard = (cardId) => {
    if (isAnimating || selectedCards.includes(cardId)) return;

    setIsAnimating(true);
    setCurrentSelectedCard(cardId);

    // Después de 6 segundos, se agrega como jugada
    setTimeout(() => {
      setSelectedCards(prev => [...prev, cardId]);
      setCurrentSelectedCard(null);
      setIsAnimating(false);
    }, 6000);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setSelectedCards([]);
    setCurrentSelectedCard(null);
    setIsAnimating(false);
    setGameStarted(false);
    localStorage.removeItem('loteria-selected-cards');
    localStorage.removeItem('loteria-game-started');
  };

  if (loading) {
    return (
      <div className={styles.loteriaContainer}>
        <div className={styles.loading}>
          <h2>Cargando imágenes...</h2>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loteriaContainer}>
      {/* Header */}
      <div className={styles.header}>
        <img 
          src="./src/assets/images/logo.png" 
          alt="Logo Lotería" 
          className={styles.logo}
        />
        <h1 className={styles.title}>LOTERÍA 2025</h1>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </div>

      {/* Controles */}
      <div className={styles.controls}>
        {!gameStarted ? (
          <button onClick={startGame} className={styles.startButton}>
            Iniciar Lotería
          </button>
        ) : (
          <div className={styles.gameControls}>
            <button onClick={resetGame} className={styles.resetButton}>
              Reiniciar
            </button>
            <div className={styles.counter}>
              Cartas seleccionadas: {selectedCards.length}/100
            </div>
            {isAnimating && (
              <div className={styles.timer}>
                <div className={styles.timerBar}></div>
                <span>Mostrando carta...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cartas */}
      <CardGrid 
        cards={cards}
        selectedCards={selectedCards}
        currentSelectedCard={currentSelectedCard}
        isAnimating={isAnimating}
        gameStarted={gameStarted}
        onCardClick={selectCard}
      />

      {/* Carta ampliada */}
      {currentSelectedCard && (
        <div className={styles.expandedCardOverlay}>
          <div className={styles.expandedCard}>
            <img 
              src={cards.find(card => card.id === currentSelectedCard)?.image}
              alt={`Carta ${currentSelectedCard}`}
              className={styles.expandedCardImage}
              onError={(e) => {
                e.target.src = `./src/assets/cards/card-1.jpg`;
              }}
            />
            <h2 className={styles.expandedCardTitle}>
              {cards.find(card => card.id === currentSelectedCard)?.name}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoteriaGame;
