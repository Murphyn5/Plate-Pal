import { Link, useHistory } from "react-router-dom";
import "./BusinessCard.css";
import trash from "../../Images/ImageModal/trash.png";

const BusinessCard = ({ business }) => {
  const history = useHistory();

  const handleDeleteRedirect = () => {
    history.push(`/businesses/${business.id}/delete`);
  };

  const handleEditRedirect = () => {
    history.push(`/businesses/${business.id}/edit`);
  };

  return (
    <div className="business-card">
      {/* business name */}
      <Link to={`/businesses/${business.id}`}>
        <h2>{business.name}</h2>
      </Link>
      <img src={business.images[0]?.url} alt={business.name} />
      {/* city, state */}
      <p>{`${business.city}, ${business.state}`}</p>
      {/* category */}
      <p>{business.category}</p>
      <div>
        <i className="fa-solid fa-pen-to-square"></i>
        <span className="manage-business-text" onClick={handleEditRedirect}>Edit Business</span>
      </div>
      <div>
        <div>
          <i className="fa-solid fa-trash"></i>
          <span className="manage-business-text" onClick={handleDeleteRedirect}>Delete Business</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
