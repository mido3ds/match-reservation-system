import React from 'react';
import CardComponent from '../CardComponent/CardComponent';

function Cards({ cards, loading, cardIdentifier }) {
  if (loading) {
    return (<h2>Loading...</h2>);
  }

  return (
    <div className="flex-container-row-vcenter-hcenter" style={{width: '100%'}}>
      {cards.map(card => (
        <CardComponent card={card} id={cardIdentifier} key={card.id} />
      ))}
    </div>
  );
}

export default Cards;