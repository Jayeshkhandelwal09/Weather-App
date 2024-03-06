import React, { useEffect, useState } from "react";
import { CITY } from "../constants";
import { MdDateRange } from "react-icons/md";
import Spinner from "./Spinner";

export const Weather = () => {
  const [city, setCity] = useState("Ho Chi Minh");
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "31b7185bccf137e1855c1c6256268743";
  const arr = [0,9,17]

  useEffect(() => {
    fetchData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      setWeather
    );
    fetchData(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
      setForecast
    );
  }, [city]);

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      setError(false);
      const data = await fetch(url);
      const json = await data.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  console.log(forecast);

  return (
    <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-5 min-h-screen">
  <h1 className="font-bold text-center text-4xl text-black mb-5">Weather App</h1>
  <div className="flex justify-center mb-5">
  <select
  onChange={(e) => setCity(e.target.value)}
  value={city}
  className="p-2 bg-white rounded-md shadow-md mb-5"
>
  {CITY.map((city, key) => (
    <option key={key} value={city.value}>
      {city.title}
    </option>
  ))}
</select>
  </div>
 
  {loading ? (
    <div className="flex justify-center ">
    <Spinner/>
    </div>
  ) : weather && forecast ? (
    <div className="flex justify-center flex-wrap space-y-5 ">
      <div className="bg-white rounded-lg shadow-lg p-5 mr-5 border-2 border-black">
        <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
        <h3 className="mb-2">
          City: <span className="text-teal-500">{weather.name}</span>
        </h3>
        <p className="mb-1">Temperature: {weather.main.temp} °C</p>
        <p className="mb-1">Humidity: {weather.main.humidity}%</p>
        <p className="mb-1">Wind Speed: {weather.wind.speed} m/s</p>
        <p>Description: {weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="mt-3"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-xl text-center font-semibold mb-2">Next three Days weather</h1>
        <div className="flex justify-around flex-wrap">
          {arr.map((index) => (
            <div key={index} className=" bg-white border-2 border-black  rounded-lg shadow-lg p-3 m-2">
            <p>Date:{forecast.list[index].dt_txt.split(" ")[0]}</p>
              <p>Temperature: {forecast.list[index].main.temp} °C</p>
              <p>Description: {forecast.list[index].weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.list[index].weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null}
</div>


  );
};
