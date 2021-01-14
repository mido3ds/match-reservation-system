import React, { useEffect, useState } from 'react';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';


function CardsArea({ cards, hasNext, cardIdentifier, onSetPage }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className = "flex-container-column-vcenter-hcenter">
      <div className = "flex-container-row-vcenter-hcenter">
        <Cards cards={cards} loading={loading} cardIdentifier={cardIdentifier} />
      </div>
      <Pagination
        paginate={onSetPage}
        hasNext={hasNext}
      />
    </div>
  );
}

export default CardsArea;