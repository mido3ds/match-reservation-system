import './StadiumCard.css';

function StadiumCard({ card }) {
  return (
    <div className="stadium-card flex-container-col-centered">
      <h1 className="name-area">{card.name}</h1>
      <h2 className="city-area">{card.city}</h2>
    </div>
  );
}

export default StadiumCard;