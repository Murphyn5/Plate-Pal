import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getSingleBusinessThunk } from "../../../store/businesses";
import { getBusinessReviewsThunk } from "../../../store/reviews";
import ReviewCard from "../../Review/ReviewCard";
import OpenImageModalButton from "../../OpenImageModalButton";
import ImageModal from "../../Images/ImageModal";
import { getImagesAction } from "../../../store/images";
// import css
import StarCalculator from "../BusinessSearched/StarCalculator";
import "./BusinessDetail.css";
import CreateImageFormModal from "../../CreateImageFormModal";
import ColoredLine from "../../ColoredLine";
import { useHistory } from "react-router-dom";

const BusinessDetail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector((state) => state.businesses.singleBusiness);
  const reviews = useSelector((state) => state.reviews.businessReviews);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const businessRestore = async () => {
      const businessResponse = await dispatch(
        getSingleBusinessThunk(businessId)
      );
      console.log(businessResponse);
      if (!businessResponse) {
        history.push("/404");
      }
      await dispatch(getBusinessReviewsThunk(businessId));
    };
    businessRestore();
  }, [dispatch, businessId]);

  const handleButtonClick = async (e) => {
    const images = {};
    business.images.forEach((business) => {
      images[business.id] = business;
    });
    await dispatch(getImagesAction({ images: images }));
  };

  const priceChecker = () => {
    if (business.price === 1) {
      return "$";
    }
    if (business.price === 2) {
      return "$$";
    }
    if (business.price === 3) {
      return "$$$";
    }
    if (business.price === 4) {
      return "$$$$";
    }
  };

  if (!business || !reviews) {
    return null;
  }

  const hoursChecker = () => {
    let isOpen;

    let businessDayHours = business.hours_of_operation.split(", ");
    const d = new Date();
    let dayIndex = d.getDay();

    let days = ["S  ", "M", "T ", "W", "R ", "F ", "S "];

    let todaysHours = businessDayHours?.find((day) =>
      day.startsWith(days[dayIndex] + ":")
    );

    if (todaysHours?.split(": ")[1] === "Closed") {
      isOpen = false;
      return [isOpen, "Business is not open today"];
    }

    todaysHours = todaysHours?.split(": ")[1];

    let openTime = todaysHours?.split("-")[0];
    let closeTime = todaysHours?.split("-")[1];

    function convertTo24Hour(time) {
      // Check if the time is in the format of "Xpm" or "Xam", where X is a number
      if (/^\d+[ap]m$/i.test(time)) {
        // Extract the hours, minutes, and AM/PM indicator from the time string
        const hours = parseInt(time.match(/^\d+/)[0]);
        const minutes = "00";
        const indicator = time.slice(-2);

        // Convert the hours to 24-hour format
        let hour = hours;
        if (indicator === "pm" && hour !== 12) {
          hour += 12;
        } else if (indicator === "am" && hour === 12) {
          hour = 0;
        }

        // Pad the hour value with a leading zero if necessary
        const formattedHour = hour.toString().padStart(2, "0");

        // Return the formatted time string in 24-hour form
        return `${formattedHour}:${minutes}`;
      } else if (/^\d{1,2}:\d{2}[ap]m$/i.test(time)) {
        // Extract the hours, minutes, and AM/PM indicator from the time string
        const [hours, minutesAndIndicator] = time.split(":");
        const minutes = minutesAndIndicator.slice(0, 2);
        const indicator = minutesAndIndicator.slice(-2);

        // Convert the hours to 24-hour format
        let hour = parseInt(hours, 10);
        if (indicator === "pm" && hour !== 12) {
          hour += 12;
        } else if (indicator === "am" && hour === 12) {
          hour = 0;
        }

        // Pad the hour and minute values with leading zeros if necessary
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");

        // Return the formatted time string in 24-hour form
        return `${formattedHour}:${formattedMinutes}`;
      } else {
        // If the time is not in the format of "Xpm" or "Xam" or "hh:mmXM", assume it's already in 24-hour format and return it as is
        return time;
      }
    }

    openTime = convertTo24Hour(openTime);
    closeTime = convertTo24Hour(closeTime);

    function getTimeString() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }

    function isTimeInRange(timeString, startTimeString, endTimeString) {
      const time = new Date(`2023-01-01T${timeString}`);
      const startTime = new Date(`2023-01-01T${startTimeString}`);
      const endTime = new Date(`2023-01-01T${endTimeString}`);

      return time >= startTime && time <= endTime;
    }

    isOpen = isTimeInRange(getTimeString(), openTime, closeTime);

    return [isOpen, todaysHours];
  };

  let isOpen;
  let hours;
  if (hoursChecker()[0]) {
    isOpen = <span style={{ color: "rgba(4,197,133,1)" }}>Open</span>;
    hours = hoursChecker()[1];
  } else {
    isOpen = <span style={{ color: "rgba(255,139,135,1)" }}>Closed</span>;
    hours = hoursChecker()[1];
  }

  let columns;
  business.images?.length === 1 ? (columns = "1fr") : (columns = columns);
  business.images?.length === 2 ? (columns = "1fr 1fr") : (columns = columns);
  business.images?.length === 3
    ? (columns = "1fr 1fr 1fr")
    : (columns = columns);
  business.images?.length >= 4
    ? (columns = "1fr 1fr 1fr 1fr")
    : (columns = columns);

  let mondayHours = business.hours_of_operation.split(", ")[0];
  mondayHours = mondayHours.split(": ")[1];

  let tuesdayHours = business.hours_of_operation.split(", ")[1];
  tuesdayHours = tuesdayHours.split(": ")[1];

  let wednesdayHours = business.hours_of_operation.split(", ")[2];
  wednesdayHours = wednesdayHours.split(": ")[1];

  let thursdayHours = business.hours_of_operation.split(", ")[3];
  thursdayHours = thursdayHours.split(": ")[1];

  let fridayHours = business.hours_of_operation.split(", ")[4];
  fridayHours = fridayHours.split(": ")[1];

  let saturdayHours = business.hours_of_operation.split(", ")[5];
  saturdayHours = saturdayHours.split(": ")[1];

  let sundayHours = business.hours_of_operation.split(", ")[6];
  sundayHours = sundayHours.split(": ")[1];

  return (
    <>
      <div className="business-detail-title-background-wrapper">
        <div
          className="business-detail-title-background"
          style={{ display: "grid", gridTemplateColumns: columns }}
        >
          {business.images && business.images[0] ? (
            <>
              <div className="business-detail-image-wrapper">
                <img src={business.images[0].url}></img>
                <img src={business.images[0].url}></img>
              </div>
            </>
          ) : (
            <></>
          )}
          {business.images && business.images[1] ? (
            <>
              <div className="business-detail-image-wrapper">
                <img src={business.images[1].url}></img>
                <img src={business.images[1].url}></img>
              </div>
            </>
          ) : (
            <></>
          )}
          {business.images && business.images[2] ? (
            <>
              <div className="business-detail-image-wrapper">
                <img src={business.images[2].url}></img>
                <img src={business.images[2].url}></img>
              </div>
            </>
          ) : (
            <></>
          )}
          {business.images && business.images[3] ? (
            <>
              <div className="business-detail-image-wrapper">
                <img src={business.images[3].url}></img>
                <img src={business.images[3].url}></img>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="business-detail-title-card-wrapper"></div>
      <div className="business-detail-title-card">
        <h1>{business.name}</h1>
        <br></br>
        <div className="business-detail-reviews-information">
          {StarCalculator(business.avg_rating)}
          {`${business.number_of_reviews} reviews`}
        </div>
        <br></br>
        <div className="business-detail-related-information">
          <span style={{ color: "rgba(88,180,255,1)" }}>
            <i className="fa-solid fa-circle-check"></i>
            {` Claimed`}
          </span>
          &nbsp; &bull; &nbsp;
          {priceChecker()}
          &nbsp; &bull; &nbsp;
          {business.category}
        </div>
        <div className="business-detail-hours-images-container">
          <div>
            {isOpen} &nbsp; {hours}
          </div>
          <Link to={`/businesses/${business.id}/images`}>
            <button>{`See all ${
              business.images ? business.images.length : ""
            } images`}</button>
          </Link>
        </div>
      </div>

      <div className="business-detail-info-container">
        <div className="business-detail-links">
          <div className="business-detail-add-buttons">
            <Link to={`/businesses/${business.id}/reviews/new`}>
              <button className="business-detail-review-button">
                <i className="fa-regular fa-star"></i>&nbsp;Write a Review
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <div className="business-detail-image-button">
              <OpenImageModalButton
                modalComponent={
                  <CreateImageFormModal business_id={business.id} />
                }
              ></OpenImageModalButton>
            </div>
          </div>

          <div className="business-detail-website-link">
            <a href={business.website}>{business.website}</a>
            &nbsp;
            <i className="fa-solid fa-up-right-from-square"></i>
          </div>
        </div>
        <ColoredLine />
        <br></br>
        <h2>Location & Hours</h2>
        <div className="business-details-location-hours-container">
          <div className="business-details-location-container">
            <br></br>
            <div> {business.address} </div>
            <br></br>
            <div>
              {" "}
              {`${business.city}, ${business.state} ${business.zipcode}`}{" "}
            </div>
            <br></br>
            <Link
              to={`/businesses/search/${business.address}/20/${business.lat}/${business.lng}`}
            >
              <button>See On Map</button>
            </Link>
          </div>

          <div className="business-details-hours-container">
            <div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
            <div>
              <div>{mondayHours}</div>
              <div>{tuesdayHours}</div>
              <div>{wednesdayHours}</div>
              <div>{thursdayHours}</div>
              <div>{fridayHours}</div>
              <div>{saturdayHours}</div>
              <div>{sundayHours}</div>
            </div>
          </div>
        </div>
        <br></br>
        <ColoredLine />
        <br></br>
        <h2>Recommended Reviews</h2>
        {Object.values(reviews).length === 0 && (
          <p>
            <br></br>
            No reviews available for this business. Be the first to write one!
            <br></br>
            <br></br>
            <br></br>
          </p>
        )}
      </div>

      <div className="business-details-reviews-container">
        {Object.values(reviews).map((review) => {
          return <ReviewCard review={review} key={review.id} />;
        })}
      </div>
    </>
  );
};

export default BusinessDetail;
