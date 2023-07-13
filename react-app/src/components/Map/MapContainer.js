import React, { useState, useEffect } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
} from "google-maps-react-17";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { searchBusinessesThunk } from "../../store/businesses";
import "./mapcontainer.css";
import BusinessSearchCard from "../Business/BusinessSearched/BusinessSearchCard";

const blueIcon = {
  url: "https://media.discordapp.net/attachments/533035859214073877/1085299587079745646/25624562456.png",
};

const MapContainer = ({ google, searchString, selected, setSelected, zoom, lat, lng }) => {
  let businesses = useSelector((state) => state.businesses.filteredBusinesses);
  const dispatch = useDispatch();
  const history = useHistory();
  const [mapZoom, setMapZoom] = useState(null)
  const [mapLat, setMapLat] = useState(null)
  const [mapLng, setMapLng] = useState(null)

  useEffect(() => {
    const searchBusinesses = async () => {
      let businesses = await dispatch(searchBusinessesThunk(searchString));
      businesses = Object.values(businesses.businesses)
      await setMapZoom(zoom ? Number(zoom) : 3)
      await setMapLat(lat ? parseFloat(lat) : (businesses[0] ? businesses[0].lat : 0))
      await setMapLng(lng ? parseFloat(lng) : (businesses[0] ? businesses[0].lng : 0))
    }
    searchBusinesses()

  }, [dispatch]);

  const handleMarkerClick = (businessId) => {
    history.push(`/businesses/${businessId}`);
  };

  // if (!businesses || Object.values(businesses).length < 1) return null



  if (mapZoom === null || mapLat === null || mapLng === null){
    return null
  }


  businesses = Object.values(businesses);


  return (
    <div className="maps-container">
      <Map
        style={{
          position: "relative",
          width: "100%",
          height: '100%',
          maxHeight: '',
        }}
        google={google}
        zoom={mapZoom}
        initialCenter={{
          lat: mapLat,
          lng: mapLng,
        }} // San Francisco coordinates
      >
        {businesses.map((business) => (
          <Marker
            key={business.id}
            title={business.name}
            name={business.name}
            position={{ lat: business.lat, lng: business.lng }}
            icon={selected && selected.id === business.id ? blueIcon : null}
            onMouseover={() => {
              setSelected(business);
            }}
          />
        ))}
        {/* {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            visible={true}
            onCloseClick={() => {
              setSelected(null);
            }}
            onMouseover={false}
          >
            <div
              onClick={() => {
                history.push(`/businesses/${selected.id}`);
              }}
              style={{
                position: "relative",
                zIndex: 1,
                cursor: "pointer",
              }}
            >
              <h2>{selected.name}</h2>
              <h4>{selected.category}</h4>
              <br />
              <h3>{selected.avg_rating.toFixed(2)} ⭐</h3>
              <br />
              <img src={selected.images[0].url} width="120" height="100" />
              <br />
              <br />
            </div>
          </InfoWindow>
        )} */}
        {selected && (
          <BusinessSearchCard business={selected} className={'map-div'}/>
          // <div
          //   style={{
          //     position: "fixed",
          //     color: "black",
          //     top: "80px",
          //     left: "610px",
          //     width: "130px",
          //     zIndex: 2,
          //     backgroundColor: "white",
          //     padding: "10px",
          //     borderRadius: "5px",
          //     boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
          //     cursor: "pointer",
          //   }}
          //   position={{ lat: selected.lat, lng: selected.lng }}
          //   onClick={() => {
          //     history.push(`/businesses/${selected.id}`);
          //   }}
          // >
          //   <h2>{selected.name}</h2>

          //   <h4>{selected.category}</h4>
          //   <br />
          //   <h3>{selected.avg_rating.toFixed(2)} ⭐</h3>
          //   <br />
          //   <img src={selected.images[0].url} width="120" height="100" />
          //   <br />
          //   <br />
          // </div>
        )}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);

export { MapContainer };
