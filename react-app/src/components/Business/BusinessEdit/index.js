import "./BusinessEdit.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getSingleBusinessThunk,
  editBusinessThunk,
} from "../../../store/businesses";

/* --------------------------------------------------------------------------------  */
// date and time helper functions
const TimePicker = ({ id, value, onChange, isClosed }) => {
  return (
    <input
      type="time"
      id={id}
      placeholder={"Mon"}
      value={value}
      onChange={onChange}
      style={isClosed ? undefined : inputStyle(value)}
    ></input>
  );
};

const inputStyle = (value) => ({
  borderColor: value ? "initial" : "red",
  "border-radius": "5px",
  "border-style": "solid",
});

const DayHours = ({ day, openTime, closeTime, setOpenTime, setCloseTime }) => {
  const [isValid, setIsValid] = useState(true);
  const isClosed = openTime === "Closed" && closeTime === "Closed";

  const handleOpenTimeChange = (e) => {
    const newOpenTime = e.target.value;
    setOpenTime(day, newOpenTime);
    validateTimes(newOpenTime, closeTime);
  };

  const handleCloseTimeChange = (e) => {
    const newCloseTime = e.target.value;
    setCloseTime(day, newCloseTime);
    validateTimes(openTime, newCloseTime);
  };

  const handleClosedChange = (e) => {
    if (e.target.checked) {
      setOpenTime(day, "Closed");
      setCloseTime(day, "Closed");
    } else {
      setOpenTime(day, "");
      setCloseTime(day, "");
    }
  };

  const validateTimes = (newOpenTime, newCloseTime) => {
    if (newOpenTime === "Closed" || newCloseTime === "Closed") {
      setIsValid(true);
      return;
    }

    const openTimeDate = new Date(`1970-01-01T${newOpenTime}Z`);
    const closeTimeDate = new Date(`1970-01-01T${newCloseTime}Z`);

    if (newCloseTime) {
      setIsValid(openTimeDate < closeTimeDate);
    }
  };

  return (
    <div className="day-hours-container">
      <div className="day-hours">
        <label htmlFor={`${day}-open`} className="day-label">
          {day}
        </label>
        <TimePicker
          id={`${day}-open`}
          value={isClosed ? "" : openTime}
          onChange={handleOpenTimeChange}
          disabled={isClosed}
          className="time-picker"
          isClosed={isClosed}
        />
        <label htmlFor={`${day}-close`} className="separator">
          to
        </label>
        <TimePicker
          id={`${day}-close`}
          value={isClosed ? "" : closeTime}
          onChange={handleCloseTimeChange}
          disabled={isClosed}
          className="time-picker"
          isClosed={isClosed}
        />
        <label htmlFor={`${day}-closed`} className="closed-label">
          Closed
        </label>
        <input
          type="checkbox"
          id={`${day}-closed`}
          checked={isClosed}
          onChange={handleClosedChange}
          className="closed-checkbox"
        />
        {!isValid && (
          <div className="validation-message">
            Opening time must be before closing time.
          </div>
        )}
      </div>
    </div>
  );
};

const days = ["M", "T ", "W", "R ", "F ", "S ", "S  "];

/* --------------------------------------------------------------------------------  */

const BusinessEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);

  const { businessId } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState(0);
  const [phone_number, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [hours_of_operation, setHoursOfOperation] = useState("");
  const [price, setPrice] = useState(0);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  // date and time manipulation
  const setOpenTime = (day, time) => {
    setHoursOfOperation((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: time },
    }));
  };

  const setCloseTime = (day, time) => {
    setHoursOfOperation((prev) => ({
      ...prev,
      [day]: { ...prev[day], close: time },
    }));
  };

  const formatHoursOfOperation = (hoursObj) => {
    const formatTime = (timeStr) => {
      const time = new Date(`1970-01-01T${timeStr}Z`);
      const hours = time.getUTCHours();
      const minutes = time.getUTCMinutes();
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = ((hours + 11) % 12) + 1;

      return `${formattedHours}${minutes === 0 ? "" : `:${minutes}`}${period}`;
    };

    return days
      .map((day) => {
        const openTime = hoursObj[day]?.open;
        const closeTime = hoursObj[day]?.close;

        if (openTime === "Closed" && closeTime === "Closed") {
          return `${day}: Closed`;
        } else {
          return `${day}: ${formatTime(openTime)}-${formatTime(closeTime)}`;
        }
      })
      .join(", ");
  };

  // repopulating input fields
  useEffect(() => {
    dispatch(getSingleBusinessThunk(businessId));

    const restoreBusiness = async () => {
      let restoredBusiness = await dispatch(getSingleBusinessThunk(businessId));

      if (restoredBusiness.owner_id !== currentUser.id) history.push("/");

      setName(restoredBusiness.name);
      setCategory(restoredBusiness.category);
      setAddress(restoredBusiness.address);
      setCity(restoredBusiness.city);
      setState(restoredBusiness.state);
      setZipCode(restoredBusiness.zipcode);
      setPhoneNumber(restoredBusiness.phone_number);
      setWebsite(restoredBusiness.website);
      setLat(restoredBusiness.lat);
      setLng(restoredBusiness.lng);
      setPrice(restoredBusiness.price);
      // setHoursOfOperation(restoredBusiness.hours_of_operation);
    };

    restoreBusiness();
  }, [dispatch]);

  // handle frontend error validations
  useEffect(() => {
    const valErrors = [];

    if (name.length < 1) valErrors.push("Business name is required");
    if (name.length > 40)
      valErrors.push("Maximum characters for a business name is 40");
    if (category.length < 1) valErrors.push("Category is required");
    if (address.length < 1) valErrors.push("Address is required");
    if (address.length > 64)
      valErrors.push("Maximum characters for an address is 64 characters");
    if (city.length < 1) valErrors.push("City is required");
    if (city.length > 25)
      valErrors.push("Maximum characters for a city is 25 characters");
    if (state.length < 1) valErrors.push("State is required");
    if (state.length !== 2)
      valErrors.push("State needs to be abbreviated (2 characters)");
    if (zipcode.toString().length !== 5)
      valErrors.push("Zipcode must be 5 digits");
    if (phone_number.length < 1) valErrors.push("Phone number is required");
    if (phone_number.length > 15)
      valErrors.push("Please format phone number as ###-###-####");
    if (website.length < 1) valErrors.push("Website is required");
    // may need the regex validations that wtform uses for URL()
    if (!hoursOfOperationChecker())
      valErrors.push("Hours of operations are required");

    setErrors(valErrors);
  }, [
    name,
    category,
    address,
    city,
    state,
    zipcode,
    phone_number,
    website,
    hours_of_operation,
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (errors.length) return;

    const businessContent = {
      name: name,
      category: category,
      address: address,
      city: city,
      state: state,
      zipcode: Number(zipcode),
      phone_number: phone_number,
      website: website,
      lat: lat,
      lng: lng,
      price: price,
      hours_of_operation: formatHoursOfOperation(hours_of_operation),
    };

    let response = await dispatch(
      editBusinessThunk(businessContent, businessId)
    );

    if (Array.isArray(response)) setErrors(response);

    if (!Array.isArray(response)) {
      history.push(`/businesses/${response.id}`);
    }
  };

  // checks for start before or after time, sets valid / invalid
  const allTimesValid = days.every(
    (day) => hours_of_operation[day]?.isValid !== false
  );

  // hours of operations required checker
  const hoursOfOperationChecker = () => {
    // Check if all days have data for hours of operation
    const allDaysHaveData = days.every(
      (day) => hours_of_operation[day]?.open && hours_of_operation[day]?.close
    );

    if (allTimesValid && allDaysHaveData) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="edit-business-container-outer">
      <form className="edit-business-container" onSubmit={onSubmit}>
        <h2>Edit Business</h2>
        <span>
          We'll use this information to help you update your Plate Pal page.
        </span>
        <ul>
          {hasSubmitted &&
            errors.map((error, idx) => (
              <li style={{ color: "red" }} key={idx}>
                {error}
              </li>
            ))}
        </ul>
        <input
          type="text"
          placeholder="Your business name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Business phone number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        ></input>
        <br></br>
        <span>
          Help customers find your product and service. You can always edit and
          add more later.
        </span>
        <select
          placeholder="Select a category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={null}>Select a Category </option>
          <option value="Afghan">Afghan</option>
          <option value="African">African</option>
          <option value="Senegalese">Senegalese</option>
          <option value="South African">South African</option>
          <option value="American (New)">American (New)</option>
          <option value="American (Traditional)">American (Traditional)</option>
          <option value="Arabian">Arabian</option>
          <option value="Argentine">Argentine</option>
          <option value="Armenian">Armenian</option>
          <option value="Asian Fusion">Asian Fusion</option>
          <option value="Australian">Australian</option>
          <option value="Austrian">Austrian</option>
          <option value="Bangladeshi">Bangladeshi</option>
          <option value="Barbeque">Barbeque</option>
          <option value="Basque">Basque</option>
          <option value="Belgian">Belgian</option>
          <option value="Brasseries">Brasseries</option>
          <option value="Brazilian">Brazilian</option>
          <option value="Breakfast & Brunch">Breakfast & Brunch</option>
          <option value="Pancakes">Pancakes</option>
          <option value="British">British</option>
          <option value="Buffets">Buffets</option>
          <option value="Bulgarian">Bulgarian</option>
          <option value="Burgers">Burgers</option>
          <option value="Burmese">Burmese</option>
          <option value="Cafes">Cafes</option>
          <option value="Themed Cafes">Themed Cafes</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="Cajun/Creole">Cajun/Creole</option>
          <option value="Cambodian">Cambodian</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Dominican">Dominican</option>
          <option value="Haitian">Haitian</option>
          <option value="Puerto Rican">Puerto Rican</option>
          <option value="Trinidadian">Trinidadian</option>
          <option value="Catalan">Catalan</option>
          <option value="Cheesesteaks">Cheesesteaks</option>
          <option value="Chicken Shop">Chicken Shop</option>
          <option value="Chicken Wings">Chicken Wings</option>
          <option value="Chinese">Chinese</option>
          <option value="Cantonese">Cantonese</option>
          <option value="Dim Sum">Dim Sum</option>
          <option value="Hainan">Hainan</option>
          <option value="Shanghainese">Shanghainese</option>
          <option value="Szechuan">Szechuan</option>
          <option value="Comfort Food">Comfort Food</option>
          <option value="Creperies">Creperies</option>
          <option value="Cuban">Cuban</option>
          <option value="Czech">Czech</option>
          <option value="Delis">Delis</option>
          <option value="Diners">Diners</option>
          <option value="Dinner Theater">Dinner Theater</option>
          <option value="Eritrean">Eritrean</option>
          <option value="Ethiopian">Ethiopian</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Filipino">Filipino</option>
          <option value="Fish &amp; Chips">Fish &amp; Chips</option>
          <option value="Fondue">Fondue</option>
          <option value="Food Court">Food Court</option>
          <option value="Food Stands">Food Stands</option>
          <option value="French">French</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Reunion">Reunion</option>
          <option value="Game Meat">Game Meat</option>
          <option value="Gastropubs">Gastropubs</option>
          <option value="Georgian">Georgian</option>
          <option value="German">German</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Greek">Greek</option>
          <option value="Guamanian">Guamanian</option>
          <option value="Halal">Halal</option>
          <option value="Hawaiian">Hawaiian</option>
          <option value="Himalayan/Nepalese">Himalayan/Nepalese</option>
          <option value="Honduran">Honduran</option>
          <option value="Hong Kong Style Cafe">Hong Kong Style Cafe</option>
          <option value="Hot Dogs">Hot Dogs</option>
          <option value="Hot Pot">Hot Pot</option>
          <option value="Hungarian">Hungarian</option>
          <option value="Iberian">Iberian</option>
          <option value="Indian">Indian</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Calabrian">Calabrian</option>
          <option value="Sardinian">Sardinian</option>
          <option value="Sicilian">Sicilian</option>
          <option value="Tuscan">Tuscan</option>
          <option value="Japanese">Japanese</option>
          <option value="Conveyor Belt Sushi">Conveyor Belt Sushi</option>
          <option value="Izakaya">Izakaya</option>
          <option value="Japanese Curry">Japanese Curry</option>
          <option value="Ramen">Ramen</option>
          <option value="Teppanyaki">Teppanyaki</option>
          <option value="Kebab">Kebab</option>
          <option value="Korean">Korean</option>
          <option value="Kosher">Kosher</option>
          <option value="Laotian">Laotian</option>
          <option value="Latin American">Latin American</option>
          <option value="Colombian">Colombian</option>
          <option value="Salvadoran">Salvadoran</option>
          <option value="Venezuelan">Venezuelan</option>
          <option value="Live/Raw Food">Live/Raw Food</option>
          <option value="Malaysian">Malaysian</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Falafel">Falafel</option>
          <option value="Mexican">Mexican</option>
          <option value="Tacos">Tacos</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Egyptian">Egyptian</option>
          <option value="Lebanese">Lebanese</option>
          <option value="Modern European">Modern European</option>
          <option value="Mongolian">Mongolian</option>
          <option value="Moroccan">Moroccan</option>
          <option value="New Mexican Cuisine">New Mexican Cuisine</option>
          <option value="Nicaraguan">Nicaraguan</option>
          <option value="Noodles">Noodles</option>
          <option value="Pakistani">Pakistani</option>
          <option value="Pan Asia">Pan Asia</option>
          <option value="Persian/Iranian">Persian/Iranian</option>
          <option value="Peruvian">Peruvian</option>
          <option value="Pizza">Pizza</option>
          <option value="Polish">Polish</option>
          <option value="Polynesian">Polynesian</option>
          <option value="Pop-Up Restaurants">Pop-Up Restaurants</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Poutineries">Poutineries</option>
          <option value="Russian">Russian</option>
          <option value="Salad">Salad</option>
          <option value="Sandwiches">Sandwiches</option>
          <option value="Scandinavian">Scandinavian</option>
          <option value="Scottish">Scottish</option>
          <option value="Seafood">Seafood</option>
          <option value="Singaporean">Singaporean</option>
          <option value="Slovakian">Slovakian</option>
          <option value="Somali">Somali</option>
          <option value="Soul Food">Soul Food</option>
          <option value="Soup">Soup</option>
          <option value="Southern">Southern</option>
          <option value="Spanish">Spanish</option>
          <option value="Sri Lankan">Sri Lankan</option>
          <option value="Steakhouses">Steakhouses</option>
          <option value="Supper Clubs">Supper Clubs</option>
          <option value="Sushi Bars">Sushi Bars</option>
          <option value="Syrian">Syrian</option>
          <option value="Taiwanese">Taiwanese</option>
          <option value="Tapas Bars">Tapas Bars</option>
          <option value="Tapas/Small Plates">Tapas/Small Plates</option>
          <option value="Tex-Mex">Tex-Mex</option>
          <option value="Thai">Thai</option>
          <option value="Turkish">Turkish</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="Uzbek">Uzbek</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Waffles">Waffles</option>
          <option value="Wraps">Wraps</option>
        </select>
        <br></br>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder="Zipcode"
          value={zipcode}
          onChange={(e) => setZipCode(e.target.value)}
        ></input>
        <div className="edit-business-price-container">
          <br></br>
          <span>Select your restaurant average price:</span>
          <div className="edit-business-price-radios">
            <label>
              <input
                type="radio"
                name="price"
                value="$"
                checked={price === 1}
                onChange={() => setPrice(1)}
              />
              $
            </label>

            <label>
              <input
                type="radio"
                name="price"
                value="$$"
                checked={price === 2}
                onChange={() => setPrice(2)}
              />
              $$
            </label>

            <label>
              <input
                type="radio"
                name="price"
                value="$$$"
                checked={price === 3}
                onChange={() => setPrice(3)}
              />
              $$$
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="$$$$"
                checked={price === 4}
                onChange={() => setPrice(4)}
              />
              $$$$
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="$$$$$"
                checked={price === 5}
                onChange={() => setPrice(5)}
              />
              $$$$$
            </label>
          </div>
        </div>
        <br></br>
        <h3 className="day-hours-container">Hours of Operation</h3>
        <br></br>
        {days.map((day) => (
          <DayHours
            key={day}
            day={day}
            openTime={hours_of_operation[day]?.open || ""}
            closeTime={hours_of_operation[day]?.close || ""}
            setOpenTime={setOpenTime}
            setCloseTime={setCloseTime}
          />
        ))}
        <br></br>
        <button className="edit-business-submit-button">Update Business</button>
      </form>
    </div>
  );
};

export default BusinessEdit;
