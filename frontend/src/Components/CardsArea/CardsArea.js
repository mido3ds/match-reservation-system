import React, { useEffect, useState } from 'react';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';

const CARDS_PER_PAGE = 10;

function CardsArea({ cards, cardIdentifier, onSetPage }) {
  const [currentCards, setCurrentCards] = useState(cards);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Get current cards
    const indexOfLastPost = currentPage * CARDS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - CARDS_PER_PAGE;
    setCurrentCards(cards.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, cards]);

  return (
    <div className = "flex-container-column-vcenter-hcenter">
      <div className = "flex-container-row-vcenter-hcenter">
        <Cards cards={currentCards} loading={loading} card
          cardIdentifier={cardIdentifier} />
      </div>
      <Pagination
        cardsPerPage={CARDS_PER_PAGE}
        totalCards={cards.length}
        paginate={onSetPage}
      />
    </div>
  );
}

export default CardsArea;