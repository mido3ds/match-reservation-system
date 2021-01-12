import React, { useEffect, useState } from 'react';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';

function CardsArea({ custom_cards, cardIdentifier }) {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setCards(custom_cards);
      setLoading(false);
    };
    fetchCards();
  }, []);

  // Get current cards
  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className = "flex-container-column-vcenter-hcenter">
      <div className = "flex-container-row-vcenter-hcenter">
        <Cards cards={currentCards} loading={loading} card
          cardIdentifier={cardIdentifier} />
      </div>
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={cards.length}
          paginate={paginate}
        />
    </div>

  );
}

export default CardsArea;