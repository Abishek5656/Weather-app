import { FaLocationArrow } from "react-icons/fa";

import Summary from "../summary/Summary";
import "./style.scss";
import { useState } from "react";

const Dashboard = ({ forecast, weatherData, dateAndTime}) => {
  const [value, setValue] = useState("");
  const humidityValue = Number(weatherData?.main?.humidity) || 0;
  return (
    <div className="dashboard">
      {/*weather_report  */}
      <div className="weather_report">
        {/*summary-cards  */}
        <div className="summary-cards">
          <Summary forecast={forecast} dateAndTime={dateAndTime}/>
        </div>
        {/*weather-highlights-info  */}
        <div className="weather-highlights-info">
          <h1 className="weather-highlights-heading">Today's Highlights</h1>
         
          <div className="container">
            {/* wind-status-details 1st*/}
            <div className="wind-status-details">
              <p className="status">Wind status</p>
              <p className="speed">{weatherData?.wind?.speed}mph</p>
              <p className="direction">
                <FaLocationArrow /> WSW
              </p>
            </div>
            {/* humidity-status-details 2nd*/}
            <div className="humidity-status-details">
              <p className="humidity-text">Humidity</p>
              <p className="humidity-value">{humidityValue}%</p>
              <input
                type="range"
                value={humidityValue}
                onChange={(e) => setValue(e.target.value)}
                list="markers"
                min={0}
                max={100}
              />
              <datalist id="markers">
                <option value="0">0</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </datalist>
            </div>

            {/* visibility-status-info 3rd*/}

            <div className="visibility-status-info">
              <p className="visibility-label">Visibility</p>
              <p className="visibility-distance">{(weatherData?.visibility/1609).toFixed(2)} miles</p>
            </div>
            {/*  */}

            {/* air-pressure-status */}
            <div className="air-pressure-details">
              <p className="air-pressure-label">Air Pressure</p>
              <p className="air-pressure-value">{weatherData?.main?.pressure}mb</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
