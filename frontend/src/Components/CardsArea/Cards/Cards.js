import React from 'react';
import './Cards.css';
import CardComponent from '../CardComponent/CardComponent'

function Cards({cards, loading, cardIdentifier}) {

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className = "flex-container-row-vcenter-hcenter">
      {cards.map(card => (
        <CardComponent  card={card} id={cardIdentifier} key={card.id} />
      ))}
    </div>
  );
}

export default Cards;