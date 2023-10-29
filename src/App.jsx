import WeatherWidget from "./components/weatherwidget/WeatherWidget.jsx";
import Dashboard from "./components/dashboard/Dashboard";
import useWeatherData from "./components/hook/useWeatherData.jsx";

function App() {
  const {
    weatherData,
    timeZoneData,
    location,
    setLocation,
    getLocation,
    forecast,
    dateAndTime,
  } = useWeatherData();
  
  return (
    <div className="main">
      <div className="main_weatherWidget">
        <WeatherWidget
          weatherData={weatherData}
          timeZoneData={timeZoneData}
          setLocation={setLocation}
          location={location}
          getLocation={getLocation}
        />
      </div>

      <div className="main_dashboard">
        <Dashboard
          forecast={forecast}
          weatherData={weatherData}
          dateAndTime={dateAndTime}
        />
      </div>
    </div>
  );
}

export default App;
