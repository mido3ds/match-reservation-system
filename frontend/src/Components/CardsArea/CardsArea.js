import React, { useState } from 'react';
import Cards from './Cards/Cards';
import Pagination from './Pagination/Pagination';


function CardsArea({ cards, hasNext, cardIdentifier, onSetPage }) {
  const [loading] = useState(false);

  return (
    <div className = "flex-container-column-vcenter-hcenter" style={{width: '96%'}}>
      <div className = "flex-container-row-vcenter-hcenter" style={{width: '100%%'}}>
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