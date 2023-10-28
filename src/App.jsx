import WeatherWidget from "./components/weatherwidget/WeatherWidget.jsx";
import Dashboard from "./components/dashboard/Dashboard";
import { useEffect, useState } from "react";

function App() {
  const BASE_URL = "https:/api.openweathermap.org/data/2.5/";
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  const defaultLat = "51.5073";
  const defaultLong = "-0.1277";
  const [latitude, setLatitude] = useState(""); // Default latitude
  const [longitude, setLongitude] = useState(""); // Default longitude

  const [timeZoneData, setTimeZoneData] = useState([]);
  const [timeZone, setTimeZone] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecastData] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);
  // const [time, setTime] = useState();

  const fetchWeatherDataApi = async (lat, lon) => {
    try {
      const res = await fetch(
        `${BASE_URL}weather?lat=${Number(lat)}&lon=${Number(
          lon
        )}&appid=${API_KEY}&units=metric&units=imperial`
      );
      const data = await res.json();
      // console.log(data);
      // console.log(data.dt)
      setWeatherData(data);
      setTimeZone(data.dt);

    } catch (error) {
      console.error("Error fetching current weather:", error);
    }
  };

  const fetchWeatherforcast = async (lat, lon) => {
    try {
      const res = await fetch(
        `${BASE_URL}forecast?lat=${Number(lat)}&lon=${Number(
          lon
        )}&appid=${API_KEY}&units=metric&units=imperial`
      );
      const data = await res.json();
      setForecastData(data.list.slice(0, 5));
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        // Handle geolocation error
      }
    );
  }, []);

  // useEffect(() => {
  //   if (!latitude && !longitude) {
  //     fetchWeatherDataApi(defaultLat, defaultLong);

  //     fetchWeatherforcast(defaultLat, defaultLong);

  //   }
  // }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherDataApi(latitude , longitude );
      fetchWeatherforcast(latitude , longitude );
      // getTimestampsAndDates(weatherData?.dt);
    } else {
      fetchWeatherDataApi( defaultLat, defaultLong);
      fetchWeatherforcast(defaultLat, defaultLong);
    }
  }, [latitude, longitude]);


  const getTimestampsAndDates = (givenTimestamp) => {
    // Arrays to map month and day names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    // Create a Date object based on the given timestamp
    const currentDate = new Date(givenTimestamp * 1000);
  
    // Initialize an array to store the results
    const results = [];
  
    // Calculate timestamps and dates for today and the next 4 days
    for (let i = 0; i < 6; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setUTCDate(currentDate.getUTCDate() + i);
      const nextTimestamp = nextDay.getTime() / 1000;
  
      const day = days[nextDay.getUTCDay()]; // Get day of the week (0 = Sunday, 1 = Monday, ...)
      const month = months[nextDay.getUTCMonth()];
      const fullDate = nextDay.getUTCDate(); // Get day of the month
      const year = nextDay.getUTCFullYear(); // Get the year
  
      results.push({
        timestamp: nextTimestamp,
        day,
        month,
        date: fullDate, // Added a missing comma here
        year,
      });
    }
  
    setTimeZoneData(results);
   setDateAndTime(results.slice(1))
    // setDateAndTime(results.slice(1)) // Add this line to return the array of results
  };



  // console.log(timeZoneData);

  // console.log(weatherData)
  useEffect(() => {

    if (timeZone) {
      getTimestampsAndDates(timeZone);
      // console.log(timeZoneData[0])
      // console.log(dateAndTime)
    }
    console.log(timeZoneData)
    console.log("dataand time")
    console.log(dateAndTime)
    // console.log(timeZoneData);
    // console.log(timeZoneData[0]);
    // console.log(timeZoneData[0]["date"]);
    // console.log(timeZoneData[0].month);
  }, [timeZone]);

  // console.log(weatherData?.dt)
  return (
    <div className="main">
      <div className="main_weatherWidget">
        <WeatherWidget weatherData={weatherData} timeZoneData={timeZoneData}/>
      </div>

      <div className="main_dashboard">
        <Dashboard forecast={forecast} weatherData={weatherData} dateAndTime={dateAndTime}/>
      </div>
    </div>
  );
}

export default App;
