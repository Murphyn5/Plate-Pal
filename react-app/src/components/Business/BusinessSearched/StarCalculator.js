// handle stars display
import "./StarCalculator.css"
const StarCalculator = (rating) => {
  if (
    (Math.round(rating * 2) / 2).toFixed(1) === "1.0" ||
    rating === null
  ) {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x yellow"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "1.5") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x yellow"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x yellow-gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "2.0") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gold"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gold"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "2.5") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gold"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gold"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gold-gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "3.0") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "3.5") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x orange-gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "4.0") {
    return (
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "4.5") {
    return (
      <span>
      <span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse "></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x amber-gray"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
      </span>
    );
  }
  if ((Math.round(rating * 2) / 2).toFixed(1) === "5.0") {
    return (
      <span>
        <div></div>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x red"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x red"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x red"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x red"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
        <span className="fa-stack">
          <i className="fas fa-square fa-stack-2x red"></i>
          <i className="fas fa-star fa-stack-1x fa-inverse"></i>
        </span>
      </span>
    );
  }
};

export default StarCalculator;
