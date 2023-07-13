import { Link } from "react-router-dom";
import "./ReviewCard.css";
import StarCalculator from "../../Business/BusinessSearched/StarCalculator";

const ReviewCard = ({ item }) => {
  return (
    <Link to={`/businesses/${item.business_id}`}>
      <div className="review-card-container nft">
        <div className="main">
          <span className="reviewer-name">{`🆕 ${item.owner_firstname} ${item.owner_lastname[0]} wrote a review:`}</span>
          <img
            className="tokenImage review-card-image"
            src={item.business_image}
            alt={item.business_name}
          />
          <span className="business-name">{item.business_name}</span>
          <span className="rating">{StarCalculator(item.stars)}</span>
          <span className="review-card-text">
            {item.review.length < 76
              ? item.review
              : `${item.review.slice(0, 76)}...`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
