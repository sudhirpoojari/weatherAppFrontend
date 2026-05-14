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
      const backendUrl = (import.meta.env.VITE_API_URL || "https://weatherappbackend-rta8.onrender.com:5000").replace(/\/$/, "");
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
    

    



        <div className="  text-5xl py-1 text-orange-700 hover:caret-fuchsia-800 animate-bounce ">Weather App</div>
      

      <form onSubmit={getWeather}>

      <input required className="  bg-amber-200 rounded-2xl"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
        }}
      />

      <button type= "submit" className="p-3 m-1 bg-blue-700 rounded-2xl text-white hover:bg-blue-800"
        
        
      >
        Search
      </button>

     
     <button type="button" className="bg-blue-700  p-3 m-1 rounded-2xl text-white hover:bg-blue-800" onClick = {handleclear}>Reset </button>

      </form>

      {weather && (
        <div
          style={{
            marginTop: "1px",
            border: "1px solid #ccc",
            padding: "5px",
            width: "400px",
            marginInline: "auto",
            borderRadius: "10px",
          }}
        >
          <div className="bg-lime-900 text-amber-50 pl-2 overflow-x-auto" >

            <table className="text-left min-w-full">
              <thead> 
                <tr>
                  <th>Description</th>
                   <th>Weather Details</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>City : </td>  
                  <td>{weather.name}</td>
                </tr>
                <tr>
                  <td>Country : </td>  
                  <td>{weather.sys.country}</td>
                </tr>
                <tr>
                  <td>Sunrise : </td>  
                  <td>{formatTime(weather.sys.sunrise)}</td>
                </tr>
                <tr>
                  <td>Sunset : </td>  
                  <td>{formatTime(weather.sys.sunset)} </td>
                </tr>
                <tr>
                  <td>description : </td>  
                  <td>{weather.weather[0].description}</td>
                </tr>
                <tr>
                  <td>Pressure : </td>  
                  <td>{weather.main.pressure}</td>    
                </tr>
                <tr>
                  <td>Humidity : </td>  
                  <td>{weather.main.humidity}</td>
                </tr>
                <tr>
                  <td>Wind Speed : </td>  
                  <td>{weather.wind.speed}</td>
                </tr>
                <tr>
                  <td>Latitude : </td>  
                  <td>{weather.coord.lat}</td>
                </tr>
                <tr>
                  <td>Longitude : </td>  
                  <td>{weather.coord.lon}</td>
                </tr>
                 
                <tr>
                  <td>Wind Speed : </td>  
                  <td>{weather.wind.speed}</td>
                </tr>
                <tr>
                  <td>Wind Gust : </td>  
                  <td>{weather.wind.gust}</td>
                </tr>
                <tr>
                  <td>Last updated : </td>  
                  <td>{formatTime(weather.dt)}</td>
                </tr>
                


                </tbody>

            </table>
             
          </div>

        </div>
      )}

{cityerr && ( 
      <div className="text-red-500 bg-red-100 p-3 rounded-lg">
  City not found
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