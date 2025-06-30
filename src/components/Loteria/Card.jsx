import React from 'react';
import styles from './Loteria.module.css';

// Definicion del componente y sus propiedades
const Card = ({
  // informacion de la carta
  card,
  // indica si ha sido seleccionada
  isSelected,
  // esta atenuada?
  isDarkened,
  isCurrentSelected,
  isAnimating,
  gameStarted,
  onClick
}) => {
  const getCardClassName = () => {
    let className = styles.card;

    if (isSelected) {
      className += ` ${styles.cardSelected}`;
    }

    if (isDarkened) {
      className += ` ${styles.cardDarkened}`;
    }

    if (isCurrentSelected) {
      className += ` ${styles.cardHighlighted}`;
    }

    if (isAnimating && !isCurrentSelected) {
      className += ` ${styles.cardDimmedDuringAnimation}`;
    }

    if (gameStarted && !isSelected && !isAnimating) {
      className += ` ${styles.cardClickable}`;
    }

    return className;
  };

  return (
    <div
      className={getCardClassName()}
      onClick={onClick}
    >
      <div className={styles.cardInner}>
        <img
          src={card.image}
          alt={card.name}
          className={styles.cardImage}
          loading="lazy"
          onError={(e) => {
            // Fallback en caso de que la imagen no cargue
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2NyIgZmlsbD0iI2Y1ZjVmNSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjMwIiBmaWxsPSIjY2NjIi8+CiAgPHRleHQgeD0iMTAwIiB5PSIxODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+CiAgPHRleHQgeD0iMTAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2FydGEgIyR7Y2FyZC5pZH08L3RleHQ+Cjwvc3ZnPg==';
          }}
        />
        {/* <div className={styles.cardNumber}>{card.id}</div> */}
        {isSelected && !isCurrentSelected && (
          <div className={styles.cardOverlay}>
            <span className={styles.checkmark}>✓</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;