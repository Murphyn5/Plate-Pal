import { Link } from "react-router-dom";
import "./BusinessSearchCard.css";
import StarCalculator from "./StarCalculator.js";
import { useState } from "react";

const BusinessSearchCard = ({ selected, business, className}) => {
  const [selectedClass, setSelectedClass] = useState("")
  let highlight = ""
  if (!business) return null;
  if(selected) {
    if(selected.id === business.id) {
      highlight += "highlight"
    }
  }
  // if (business.id = selected.id) {
  //   setSelectedClass("selected")
  // } else{
  //   setSelectedClass("")
  // }
  // handle hours of operations closed vs open
  // conditionally render it onto the card
  // const today = new Date()

  return (
    <div id={className} className={`business-search-card-container ${highlight}`}>
      <div className="business-search-img">
        <img src={business.images[0]?.url}></img>
      </div>
      <div className="business-search-text">
        <Link className="business-search-name" to={`/businesses/${business.id}`}>
          <span>{business.name}</span>
        </Link>
        {business.number_of_reviews ? (
          <div className="business-search-card-rating-container">
            <span>{StarCalculator(business.avg_rating)}</span>
            &nbsp;
            <span>{` ${business.number_of_reviews}`}</span>
          </div>
        ) : (
          <div>New</div>
        )}
        <div>{business.category}</div>
        <div>Hours</div>
        <div className="business-search-card-review-container">
          <span className="business-search-card-review">really long review really long review really long review really long review really long review really long review really long review really long receassdsdsd</span>
        </div>

      </div>
    </div>
  );
};

export default BusinessSearchCard;
