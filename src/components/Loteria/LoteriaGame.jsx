import React, { useState, useEffect, useRef } from 'react';
import CardGrid from './CardGrid';
import styles from './Loteria.module.css';
import { FaPlay, FaRedo } from "react-icons/fa";
import FooterBajo from './FooterBajo';
import imagenesTeleton from './imagenesTeleton.json';


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

  // Para mostrar pausa
  const closeTimeoutRef = useRef(null);
  const animatingCardRef = useRef(null);
  const wasClosedManuallyRef = useRef(false);

  // Para manejar doble clic
  const clickTimeoutRef = useRef(null);
  const clickCountRef = useRef(0);

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
    const loadImages = () => {
      try {
        setLoading(true);

        const images = imagenesTeleton;

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

    loadImages();
  }, []);


  // Mostrar carta ampliada solo 6 segundos
  useEffect(() => {
    if (currentSelectedCard) {
      const timeout = setTimeout(() => {
        setCurrentSelectedCard(null);
        setIsAnimating(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [currentSelectedCard]);

  // Función para manejar clic en carta (simple o doble)
  const handleCardClick = (cardId) => {
    const isCardBlurred = selectedCards.includes(cardId);

    if (isCardBlurred) {
      // Si la carta está borrosa, manejar doble clic
      clickCountRef.current += 1;

      if (clickCountRef.current === 1) {
        // Primer clic - esperar por segundo clic
        clickTimeoutRef.current = setTimeout(() => {
          clickCountRef.current = 0; // Reset si no hay segundo clic
        }, 300); // 300ms para detectar doble clic
      } else if (clickCountRef.current === 2) {
        // Doble clic - rehabilitar carta
        clearTimeout(clickTimeoutRef.current);
        clickCountRef.current = 0;
        rehabilitateCard(cardId);
      }
    } else {
      // Si la carta no está borrosa, comportamiento normal
      selectCard(cardId);
    }
  };

  // Función para rehabilitar una carta (quitarla de selectedCards)
  const rehabilitateCard = (cardId) => {
    setSelectedCards(prev => prev.filter(id => id !== cardId));
  };

  // Seleccionar carta (comportamiento original)
  const selectCard = (cardId) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSelectedCard(cardId);
    animatingCardRef.current = cardId;
    wasClosedManuallyRef.current = false;

    clearTimeout(closeTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      if (animatingCardRef.current === cardId && !wasClosedManuallyRef.current) {
        setSelectedCards(prev => {
          if (!prev.includes(cardId)) {
            return [...prev, cardId];
          }
          return prev;
        });
      }
      setCurrentSelectedCard(null);
      setIsAnimating(false);
      animatingCardRef.current = null;
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

    // Limpiar timeouts de doble clic
    clearTimeout(clickTimeoutRef.current);
    clickCountRef.current = 0;
  };

  // Función para manejar el cierre manual
  const handleManualClose = () => {
    clearTimeout(closeTimeoutRef.current);
    wasClosedManuallyRef.current = true;
    animatingCardRef.current = null;
    setCurrentSelectedCard(null);
    setIsAnimating(false);
  };

  // Limpiar timeouts al desmontar el componente
  useEffect(() => {
    return () => {
      clearTimeout(closeTimeoutRef.current);
      clearTimeout(clickTimeoutRef.current);
    };
  }, []);

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
    <div>
      <div className={styles.loteriaContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div>  <img
            src='https://res.cloudinary.com/dvsiltcrs/image/upload/v1751239555/logo_zfzln1.png'
            alt="Logo Lotería"
            className={styles.logo}
          />
            <img
              src='https://res.cloudinary.com/dvsiltcrs/image/upload/v1752046458/logoTeleton_emx96j.png'
              alt="Logo Lotería 2"
              className={styles.logo}
            />
          </div>
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
              <FaPlay />
            </button>
          ) : (
            <div className={styles.gameControls}>
              <button onClick={resetGame} className={styles.resetButton}>
                <FaRedo />
              </button>


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
          onCardClick={handleCardClick} // Cambié esto para usar la nueva función
        />

        {/* Carta ampliada */}
        {currentSelectedCard && (
          <div
            className={styles.expandedCardOverlay}
            onClick={handleManualClose}
          >
            <div className={styles.expandedCard}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={cards.find(card => card.id === currentSelectedCard)?.image}
                alt={`Carta ${currentSelectedCard}`}
                className={styles.expandedCardImage}
                onError={(e) => {
                  e.target.src = `./src/assets/cards/card-1.jpg`;
                }}
              />
            </div>
          </div>
        )}

      </div>
      <FooterBajo />
    </div>
  );
};

export default LoteriaGame;