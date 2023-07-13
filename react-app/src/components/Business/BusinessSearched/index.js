import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchBusinessesThunk } from "../../../store/businesses";
import BusinessSearchCard from "./BusinessSearchCard";
import { MapPage } from "../../Map/MapPage";
import { filteredBusinessAction } from "../../../store/businesses";

import "./BusinessSearched.css";

const BusinessSearched = () => {
  const dispatch = useDispatch();
  const { searchString, zoom, lat, lng } = useParams();

  // frontend filtering states
  const [userFiltered, setUserFiltered] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [selected, setSelected] = useState(null);
  // price hover effect
  const [priceFilter, setPriceFilter] = useState(0);
  const [hover, setHover] = useState(0);

  // get business state initial render
  let searchResult = useSelector((state) => state.businesses.businesses);
  if (searchResult !== null) searchResult = Object.values(searchResult);

  // use filtered businesses after user selects filter options
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // get businesses based on user search
  useEffect(() => {
    const searchBusinesses = async () => {
      await dispatch(searchBusinessesThunk(searchString));
    };
    searchBusinesses();
  }, [dispatch, searchString]);

  // guard against empty render - no businesses found
  if (searchResult === null) return null;

  // handle user submitting filters
  const onSubmit = (e) => {
    e.preventDefault();
    setSelected(null);
    setUserFiltered(true);

    // price filtering
    const priceFilterApplied = searchResult.filter((restaurant) => {
      if (priceFilter > 0 && restaurant.price === priceFilter) {
        return restaurant;
      }
    });

    // category filtering
    const categoryFilterApplied = searchResult.filter((restaurant) => {
      if (
        categoryFilter.length > 0 &&
        categoryFilter.includes(restaurant.category)
      ) {
        return restaurant;
      }
    });

    let allFiltersApplied = [...priceFilterApplied, ...categoryFilterApplied];

    // if both filters are applied, filter for both
    // if not, just use the spread item on ~66
    if (priceFilterApplied.length > 0 && categoryFilterApplied.length > 0) {
      allFiltersApplied = searchResult.filter((restaurant) => {
        if (
          restaurant.price === priceFilter &&
          categoryFilter.includes(restaurant.category)
        ) {
          return restaurant;
        }
      });
    }

    setFilteredRestaurants(allFiltersApplied);
    setCategoryFilter([]);
    setHover(0);
    setPriceFilter(0);
    // unchecking boxes
    const checkboxReset = document.getElementsByClassName(
      "search-filter-checkboxes"
    );
    for (let checkbox of checkboxReset) {
      checkbox.checked = false;
    }

    // update store so google maps markers can update with filtered items
    dispatch(filteredBusinessAction(allFiltersApplied));
  };

  // set up categories based on initial businesses searched or filtered items (filtered, sorted alphabetical)
  let initialCategories = [
    ...new Set(searchResult.map((business) => business.category)),
  ].sort();

  let filteredCategories = [
    ...new Set(filteredRestaurants.map((business) => business.category)),
  ].sort();

  // handling the checkbox filters dynamically
  const handleCheckBoxCategory = (e, index) => {
    // e.preventDefault();
    const activeCategory = document.getElementById(index).checked;

    // adds to the category filters
    if (activeCategory === true) {
      setCategoryFilter((oldData) => [...oldData, e.target.value]);
    } else {
      // removes from the category filters
      setCategoryFilter(
        categoryFilter.filter((values) => values !== e.target.value)
      );
    }
  };

  // clear filter
  const clearFilter = (e) => {
    e.preventDefault();
    setUserFiltered(false);
    setPriceFilter(0);
    setHover(0);
    setSelected(null);
    setCategoryFilter([]);

    // unchecking boxes
    const checkboxReset = document.getElementsByClassName(
      "search-filter-checkboxes"
    );
    for (let checkbox of checkboxReset) {
      checkbox.setAttribute("checked", false);
    }

    // update store so google maps markers can update with filtered items
    dispatch(filteredBusinessAction(searchResult));
  };

  return (
    <div className="business-search-container">
      <div className="business-search-filters">
        <form onSubmit={onSubmit}>
          <h4>Filters</h4>
          {userFiltered ? (
            <span
              className="business-search-clear-filter"
              onClick={clearFilter}
            >
              Clear all
              <br></br>
            </span>
          ) : (
            ""
          )}
          <br></br>
          <div className="business-search-price-filter">
            {[...Array(5)].map((x, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index === (hover || priceFilter) ? "on" : "off"}
                  onClick={() => {
                    setSelected(null);
                    setPriceFilter(index);
                  }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(priceFilter)}
                >
                  <span className="price-rating">$</span>
                </button>
              );
            })}
          </div>
          <br></br>
          <hr></hr>
          <br></br>

          <h4>Categories</h4>
          {/* convert to filteredBUsinesses */}
          {userFiltered
            ? filteredCategories.map((category, i) => (
                <div>
                  <label>
                    <input
                      id={i}
                      type="checkbox"
                      className="search-filter-checkboxes"
                      value={category}
                      onChange={(e) => handleCheckBoxCategory(e, i)}
                    ></input>
                    <span>{category}</span>
                  </label>
                </div>
              ))
            : initialCategories.map((category, i) => (
                <div>
                  <label>
                    <input
                      id={i}
                      type="checkbox"
                      className="search-filter-checkboxes"
                      value={category}
                      onChange={(e) => handleCheckBoxCategory(e, i)}
                    ></input>
                    <span>{category}</span>
                  </label>
                </div>
              ))}
          <br></br>
          <hr></hr>
          <br></br>
          <button className="search-businesses-filter-button">Filter</button>
        </form>
      </div>

      <div className="business-search-results">
        {userFiltered && filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((business) => {
            return <BusinessSearchCard business={business} key={business.id} />;
          })
        ) : userFiltered && filteredRestaurants.length < 1 ? (
          <div>
            <p>No results found for the applied filters</p>
            <p>Please clear filters and try again</p>
          </div>
        ) : searchResult.length < 1 ? (
          <div>
            <p>No results found for {searchString}</p>
            <ul>Suggestions for improving your results:</ul>
            <li>Try a different criteria</li>
            <li>Check the spelling or try alternate spellings</li>
            <li>
              Try a more general search, e.g. "cafe" instead of "coffee beans"
            </li>
          </div>
        ) : (
          searchResult.map((business) => {
            return (
              <>
                <div
                  onClick={() => {
                    setSelected(business);
                  }}
                >
                  <BusinessSearchCard
                    selected={selected}
                    business={business}
                    key={business.id}
                  />
                </div>
              </>
            );
          })
        )}
      </div>
      <div className="business-search-map-container">
        <MapPage
          searchString={searchString}
          zoom={zoom}
          lat={lat}
          lng={lng}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default BusinessSearched;
