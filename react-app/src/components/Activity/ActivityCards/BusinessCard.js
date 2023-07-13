import { Link } from "react-router-dom";
import "./BusinessCard.css";
import { useHistory } from "react-router-dom";

const BusinessCard = ({ item }) => {
  const history = useHistory();

  return (
    <Link to={`/businesses/${item.id}`}>
      <div className="business-card-container nft">
        <br></br>
        <span className="description">New Business Open 🔔</span>
        <div className="main">
          <img
            className="tokenImage business-card-image"
            src={item.images[0]?.url}
            alt={item.name}
          />
          <h2>{item.name}</h2>
          <span className="location">{`${item.city}, ${item.state}`}</span>
          <Link to={`/businesses/search/${item.category}`}>
            <h3>{item.category}</h3>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
