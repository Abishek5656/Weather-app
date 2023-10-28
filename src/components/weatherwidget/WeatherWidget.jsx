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
const WeatherWidget = ({ weatherData, timeZoneData }) => {


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
  return (
    <div className="weatherCard">

      <div className="weatherCard_search">
        <input type="text" placeholder="Search for places" />
        <BiCurrentLocation className="weatherCard_location-Icon" />
      </div>

      <div className="weatherCard_img">
        {/* <div className="backdrop">
          <img src={ CloudBackGround} alt="" />
        </div> */}
        {weatherIcon ? <img src={weatherIcon} alt="" /> : null}
      </div>
      <div className="weatherCard_temperature-info">
        <p className="temperature">
        {typeof weatherData?.main?.temp === 'number'
    ? weatherData.main.temp.toFixed(0).toString()
    : 'N/A'}
        </p>
        <span className="units">
          &deg;<span className="degree">C</span>
        </span>
      </div>

      <h1 className="weather_season">{weatherData?.weather[0].main}</h1>

      <div className="date-container">
        {/* <p>{timeZoneData[0]?.day}</p> */}
        <p>Today</p>
        <p>.</p>
        <p>
          {timeZoneData[0]?.day}&#44;&nbsp;{timeZoneData[0]?.date}&nbsp;
          {timeZoneData[0]?.year}
        </p>
        {/* <p>Fri,27,2023</p> */}
      </div>

      <div className="location_container">
        <IoLocationSharp />
        <p>{weatherData?.name}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
