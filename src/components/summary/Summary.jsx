import "./style.scss";
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
import { useState } from "react";
const Summary = ({ forecast, dateAndTime }) => {
  // const weatherIcons = {
  //   "few clouds": LightCloud,
  //   "moderate rain": LightRain,
  //   "light rain": LightRain,
  //   "scattered clouds": LightCloud,
  //   "overcast clouds": HeavyCloud,
  //   "clear sky": Clear,
  //   "broken clouds": Shower,
  // };
  return (
    <div className="summary">
    {/* //   <div className="weatherForcast">
    //     <h2 className="date_info">Today</h2>
    //     <div className="weather_condition-image">
    //       <img src={Thunderstorm} alt="" />
    //     </div>
    //     <div className="weather-condition-info">
    //       <span>12°C</span>
    //       <span>25°C</span>
    //     </div>
    //   </div> */}
      {
        forecast.map( (forecast, index) => (
          
          <div key={index} className="weatherForcast">
          <h2 className="date_info">{dateAndTime[index]?.day}&#44;&nbsp;{dateAndTime[index]?.date}&nbsp;{dateAndTime[index]?.year}</h2>
          <div className="weather_condition-image">
            <img src={Thunderstorm} alt="" />
          </div>
          <div className="weather-condition-info">
            <span>{Number(Math.floor(forecast?.main?.temp_max))}°C</span>
            <span>{Number(Math.floor(forecast.main?.temp_min))}°C</span>
          </div>
        </div>
        ))
      }
      \


      {/* 
       forecast.map( (forecast, index) => (
          
          <div key={index} className="weatherForcast">
          {/* <h2 className="date_info">Today</h2> */}
          {/* <h2 className="date_info">{dateAndTime[index]?.day}&#44;&nbsp;{dateAndTime[index]?.date}&nbsp;{dateAndTime[index]?.year}</h2>
          <div className="weather_condition-image">
            <img src={Thunderstorm} alt="" />
          </div>
          <div className="weather-condition-info">
            <span>{Number(Math.floor(forecast?.main?.temp_max))}°C</span>
            <span>{Number(Math.floor(forecast.main?.temp_min))}°C</span>
          </div>
        </div>
       )) */}
    </div>
  );
};

export default Summary;
