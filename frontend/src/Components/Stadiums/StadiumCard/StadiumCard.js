import './StadiumCard.css';

function StadiumCard({ card: stadium }) {
  return (
    <div className="stadium-card flex-container-col-centered">
      <h1 className="name-area">{stadium.name}</h1>
      <h2 className="city-area">{stadium.city}</h2>
    </div>
  );
}

export default StadiumCard;