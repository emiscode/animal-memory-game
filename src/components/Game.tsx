import React, { useState, useEffect } from 'react';
import Board from './Board';
import { shuffle, generateAnimalPairs } from '../helpers';
import { CardProps } from './Card';

const Game: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canFlip, setCanFlip] = useState<boolean>(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [unmatchedCards, setUnmatchedCards] = useState<number[]>([]);

  useEffect(() => {
    setIsLoading(true);
    generateAnimalPairs()
      .then((generatedCards) => {
        setCards(shuffle(generatedCards));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load cards:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-xl font-bold text-orange-800 ml-2">
          Iniciando...
        </div>
      </div>
    );
  }

  const handleCardClick = (id: number) => {
    if (!canFlip) return;

    // Check if the card is already flipped or matched
    if (flippedCards.includes(id) || matchedCards.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];

    // Flip the card
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      const firstCard = cards.find((card) => card.id === newFlippedCards[0]);
      const secondCard = cards.find((card) => card.id === newFlippedCards[1]);

      if (
        firstCard &&
        secondCard &&
        firstCard.animal.name === secondCard.animal.name
      ) {
        // Match found
        setMatchedCards([...matchedCards, ...newFlippedCards]);
        // Reset flipped cards
        setFlippedCards([]);
      } else {
        setCanFlip(false);
        // No match, set unmatched cards
        setUnmatchedCards(newFlippedCards);

        // No match, flip back after a short delay
        setTimeout(() => {
          setCanFlip(true);
          setFlippedCards([]);
          setUnmatchedCards([]);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex justify-center py-8">
      {' '}
      <Board
        cards={cards.map((card) => ({
          ...card,
          flipped:
            flippedCards.includes(card.id) || matchedCards.includes(card.id),
          unmatchedCards,
        }))}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default Game;
