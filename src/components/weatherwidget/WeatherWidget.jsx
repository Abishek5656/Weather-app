import "./style.scss";
import React, { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Clear,
  CloudBackGround,
  Hail,
  HeavyCloud,
  HeavyRain,
  LightCloud,
  Thunderstorm,
  Snow,
  Sleet,
  Shower,
  LightRain,
} from "../../assets/index.js";

const WeatherWidget = ({
  weatherData,
  timeZoneData,
  location,
  setLocation,
}) => {
  const [menu, showMenu] = useState(false);
  const weatherIcons = {
    "few clouds": LightCloud,
    "moderate rain": LightRain,
    "light rain": LightRain,
    "scattered clouds": LightCloud,
    "overcast clouds": HeavyCloud,
    "clear sky": Clear,
    "broken clouds": Shower,
  };

  const weatherDescription = weatherData?.weather[0]?.description;
  const weatherIcon = weatherIcons[weatherDescription];

  const handleSetLocation = (value) => {
    setLocation(value);
    showMenu(false);
  };

  return (
    <div className="weatherCard">
      {menu && (
        <main className="menu">
          {/* menu cross */}
          <div className="menu_cross">
            <RxCross2
              className="menu_cross-icon"
              onClick={() => showMenu(!menu)}
            />
          </div>
          {/* menu search */}
          <div className="menu_search">
            <div className="menu_search-location">
              <input
                type="text"
                placeholder="search location"
                value={location}
              />
            </div>
            {/* search */}
            <button className="search-btn">Search</button>
          </div>
          {/* location buttons */}
          <button
            className="location_btn"
            onClick={() => handleSetLocation("Delhi")}
          >
            Delhi
          </button>
          <button
            className="location_btn"
            onClick={() => handleSetLocation("Barcelona")}
          >
            Barcelona
          </button>
          <button
            className="location_btn"
            onClick={() => handleSetLocation("Long Beach")}
          >
            Long Beach
          </button>
        </main>
      )}
      {!menu && (
        <>
          <div className="weatherCard_search">
            <input type="text" placeholder="Search for places" onFocus={() => showMenu(!menu)}/>
            <BiCurrentLocation className="weatherCard_location-Icon" />
          </div>
          <div className="weatherCard_img">
            {weatherIcon ? <img src={weatherIcon} alt="" /> : null}
          </div>
          <div className="weatherCard_temperature-info">
            <p className="temperature">
              {typeof weatherData?.main?.temp === "number"
                ? weatherData.main.temp.toFixed(0).toString()
                : "N/A"}
            </p>
            <span className="units">
              &deg;
              <span className="degree">C</span>
            </span>
          </div>
          <h1 className="weather_season">{weatherData?.weather[0].main}</h1>
          <div className="date-container">
            <p>Today</p>
            <p>.</p>
            <p>
              {timeZoneData[0]?.day}&#44;&nbsp;{timeZoneData[0]?.date}&nbsp;
              {timeZoneData[0]?.year}
            </p>
          </div>
          <div className="location_container">
            <IoLocationSharp />
            <p>{weatherData?.name}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
