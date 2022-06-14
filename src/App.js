import Map, { Marker, Popup } from "react-map-gl";

import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Room, Star } from "@mui/icons-material";
import { useState, useEffect, memo } from "react";
import "./app.css";
import axios from "axios";
import { format } from "timeago.js";
import Koerier from "./components/Koerier";
import ElectricBikeIcon from "@mui/icons-material/ElectricBike";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import useFetch from "./hooks/useFetch";

function App() {
  const currentUser = "Samy";
  const [pins, setpins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 4.870087,
    latitude: 52.3114207,
    zoom: 10,
  });
  const [koerierData, setKoerierData] = useState(null);
  const [mapData, setMapData] = useState(null);

  // const { data, loading, error, reFetch } = useFetch(`/drivers`);

  const getKoerierData = async () => {
    try {
      const res = await axios.get(
        "https://newbackend.samyfarahat.repl.co/api/v1/drivers?active=true"
      );
      setKoerierData(res.data);
      // alert("rerendered");
    } catch (err) {
      console.log(err);
    }
  };
  const getMapData = async () => {
    try {
      const res = await axios.get(
        "https://newbackend.samyfarahat.repl.co/api/v1/drivers?active=true"
      );
      setMapData(res.data);
      console.log(mapData);
      // alert("rerendered");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //get koerierdata on start app
    getKoerierData();
    getMapData();
  }, []);

  useEffect(() => {
    // get koerierData every 60 seconds
    let intervalFull = setInterval(() => {
      getKoerierData();
    }, 1000);

    //get mapData every 10 seconds
    let intervalMap = setInterval(() => {
      getMapData();
    }, 1000);
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  return (
    <>
      <Map
        style={{ width: "100vw", height: "100vw" }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/mapbox/streets-v10?optimize=true"
      >
        <Marker latitude={52.293069} longitude={4.861301}>
          {/* restaurant div to see how many drivers are inside */}
          {console.log("rerendered")}
          <div
            className="restaurant"
            style={{
              position: "relative",
              backgroundColor: "white",
              width: "120%",
              height: "120%",
              borderRadius: 10,
              position: "relative",
            }}
          >
            <RestaurantIcon
              style={{
                fontSize: viewState.zoom * 3,
                width: "90%",
                zIndex: 30,
                color: "orange",
                backgroundColor: "white",
                borderRadius: 10,
              }}
            />
            <div
              style={{
                zIndex: 45,
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 5,
                height: 5,
                top: -7,
                right: -7,
              }}
            >
              <Avatar
                alt="bike"
                src=""
                style={{
                  width: 33,
                  height: 33,
                  position: "relative",
                  backgroundColor: "orange",
                  padding: 0,
                  margin: 0,
                }}
              >
                2
              </Avatar>
            </div>
          </div>
        </Marker>
        {koerierData !== null &&
          koerierData.map((koerier) => (
            <>
              {koerierData !== null && (
                <Popup
                  longitude={koerier.long}
                  latitude={koerier.lat}
                  anchor="left"
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}

                  // onClose={() => setShowPopup(false)}
                >
                  <div className="card">
                    <label htmlFor="">Place</label>
                    <h4 className="place"></h4>
                    <label htmlFor="">Review</label>
                    <p className="desc"></p>
                    <label className="rating">Rating</label>
                    <label htmlFor="">Information</label>
                    <span className="username">
                      Created by <b>{koerier.login}</b>
                    </span>
                    <span className="date"></span>
                  </div>
                </Popup>
              )}

              {Math.round(koerier.routeTime) > 1 && (
                <Marker longitude={koerier.long} latitude={koerier.lat}>
                  {koerier.tomtomMode === "bicycle" && (
                    <ElectricBikeIcon
                      onClick={() => handleMarkerClick(koerier._id)}
                      style={{
                        fontSize: viewState.zoom * 3,
                        color:
                          koerier.login === currentUser ? "tomato" : "tomato",
                      }}
                    ></ElectricBikeIcon>
                  )}
                  {koerier.tomtomMode === "car" && (
                    <DirectionsCarIcon
                      onClick={() => handleMarkerClick(koerier._id)}
                      style={{
                        fontSize: viewState.zoom * 5,
                        color:
                          koerier.login === currentUser
                            ? "slateblue"
                            : "tomato",
                      }}
                    ></DirectionsCarIcon>
                  )}
                </Marker>
              )}
            </>
          ))}
      </Map>
      <Koerier koerierData={koerierData} mapData={mapData} />
    </>
  );
}

export default memo(App);
