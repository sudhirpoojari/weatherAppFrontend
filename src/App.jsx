import { useState } from "react";
import axios from "axios";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const[cityerr,setCityerr] = useState(false);
  const[loading,setLoading] = useState(false)

  const getWeather = async (e) => {
    e.preventDefault();   
    if (!city.trim() || loading) return; // Prevent empty or duplicate API calls
     setLoading(true);setCityerr(false);
    
    try {
      // Remove trailing slash if present to prevent broken double-slash URLs
      const backendUrl = (import.meta.env.VITE_API_URL || "https://weatherappbackend-rta8.onrender.com").replace(/\/$/, "");
      const res = await axios.get(
        `${backendUrl}/api/weather/${encodeURIComponent(city)}`
      );
      setWeather(res.data);
    } catch (error) {
      if (!error.response) {
        alert("Network Error: Could not connect to the backend server. Please ensure it is running.");
        setCityerr(false);
      } else {               
        setCityerr(true);
        setWeather(null);
      }
    }
    finally{
      setLoading(false);
    }
  };

  const handleclear = (e) => {
    e.preventDefault();

    setCity("");
    setWeather(null);
     setCityerr(false);
      }

      const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getWeatherBackground = () => {

  if (!weather) return "default-bg";

  const condition = weather.weather[0].main;

  switch (condition) {

    case "Clear":
      return "sunny-bg";

    case "Rain":
      return "rain-bg";

    case "Clouds":
      return "cloud-bg";

    case "Snow":
      return "snow-bg";

    case "Thunderstorm":
      return "storm-bg";

    case "Mist":
    case "Haze":
      return "mist-bg";

    default:
      return "default-bg";
  }
};



  return (

  

    <div className="text-2xl"
      style={{
        textAlign: "center",
        marginTop: "0px",
        fontFamily: "Arial",
      }}
    >

      

      <div className={`app ${getWeatherBackground()} pt-2`}>
    
        <div className="text-5xl py-6 font-bold text-white drop-shadow-lg tracking-wide">Weather App</div>
      
        <form onSubmit={getWeather} className="flex flex-col sm:flex-row justify-center items-center gap-3 my-6 px-4">
          <input 
            required 
            className="bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-800 rounded-2xl px-5 py-3 w-full sm:w-80 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all text-lg"
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button type="submit" className="px-6 py-3 bg-blue-600 rounded-2xl text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all text-lg w-full sm:w-auto">
              Search
            </button>
            <button type="button" className="px-6 py-3 bg-gray-600 rounded-2xl text-white font-semibold shadow-lg hover:bg-gray-700 hover:scale-105 transition-all text-lg w-full sm:w-auto" onClick={handleclear}>
              Reset
            </button>
          </div>
        </form>

      {weather && (
        <div className="max-w-md mx-auto mt-6 bg-black/50 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden p-6 text-white border border-white/20 mb-10 mx-4 sm:mx-auto">
          <h2 className="text-3xl font-bold text-center mb-1">{weather.name}, {weather.sys.country}</h2>
          <p className="text-center text-xl capitalize mb-6 text-gray-300 font-medium">{weather.weather[0].description}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-lg">
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Sunrise</td>  
                  <td className="py-3 text-right">{formatTime(weather.sys.sunrise)}</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Sunset</td>  
                  <td className="py-3 text-right">{formatTime(weather.sys.sunset)}</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Pressure</td>  
                  <td className="py-3 text-right">{weather.main.pressure} hPa</td>    
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Humidity</td>  
                  <td className="py-3 text-right">{weather.main.humidity}%</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Wind Speed</td>  
                  <td className="py-3 text-right">{weather.wind.speed} m/s</td>
                </tr>
                {weather.wind.gust && (
                  <tr className="border-b border-white/10">
                    <td className="py-3 font-semibold text-gray-300">Wind Gust</td>  
                    <td className="py-3 text-right">{weather.wind.gust} m/s</td>
                  </tr>
                )}
                <tr className="border-b border-white/10">
                  <td className="py-3 font-semibold text-gray-300">Coordinates</td>  
                  <td className="py-3 text-right">[{weather.coord.lat}, {weather.coord.lon}]</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-300">Last updated</td>  
                  <td className="py-3 text-right">{formatTime(weather.dt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

{cityerr && ( 
      <div className="max-w-md mx-auto text-red-500 bg-red-100/90 backdrop-blur-md p-4 rounded-xl shadow-md font-semibold mt-4">
        City not found. Please try again.
      </div>
)}

{loading && (
     <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">

  <div className="bg-white/20 p-10 rounded-3xl text-white">
    Loading Weather...
  </div>

</div>  
)}

    </div>




      </div>
  );
}

export default App;