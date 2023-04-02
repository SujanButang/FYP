import "./hotel.scss";

export default function Hotel({ hotel }) {
  console.log(hotel);
  if (!hotel) return null;
  return (
    <div className="hotel">
      <div className="image">
        <img src={hotel.image} alt="" />
      </div>
      <div className="details">
        <div className="info">
          <h4>{hotel.name}</h4>
          <p>{hotel.distance}</p>
          <p>{hotel.estimated_price}</p>
        </div>
        <div className="rating">
          <div className="reviews">
            <h6>{hotel.average}</h6>
            <span>{hotel.reviews}</span>
          </div>
          <div className="average">{hotel.score}</div>
        </div>
      </div>
      <a href={hotel.url} target="_blank" rel="noopener noreferrer">
        <button>Book Now</button>
      </a>
    </div>
  );
}
