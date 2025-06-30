import React from 'react';
import Card from './Card';
import styles from './Loteria.module.css';

const CardGrid = ({ 
  cards, 
  selectedCards, 
  currentSelectedCard, 
  isAnimating,
  gameStarted,
  onCardClick 
}) => {
  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => {
        const isSelected = selectedCards.includes(card.id);
        const isCurrentSelected = currentSelectedCard === card.id;
        const isDarkened = isSelected && !isCurrentSelected;
        
        return (
          <Card
            key={card.id}
            card={card}
            isSelected={isSelected}
            isDarkened={isDarkened}
            isCurrentSelected={isCurrentSelected}
            isAnimating={isAnimating}
            gameStarted={gameStarted}
            onClick={() => gameStarted && onCardClick(card.id)}
          />
        );
      })}
    </div>
  );
};

export default CardGrid;