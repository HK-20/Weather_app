import React, { useState } from 'react'
import './Weather.css'
import search_imag from '../assets/search.png'
import clear_imag from '../assets/clear.png'

import humidity_imag from '../assets/humidity.png'
import rain_imag from '../assets/rain.png'
import snow_imag from '../assets/snow.png'


import cloud_imag from '../assets/cloud.png'
import drizzle_imag from '../assets/drizzle.png'

import wind_imag from '../assets/wind.png'
import getWeatherData from "./fetching";

    const Weather = () => {
        const [city, setCity] = useState("");
        const [weather, setWeather] = useState(null);
        const [error, setError] = useState("");

        const handleSearch = async () => {
            try {
                setError(""); // Clear any previous error
                setWeather(null); // Clear previous weather data

                // Fetch the weather data by passing the city name
                const currentWeather = await getWeatherData(city);
                console.log("API Response:", currentWeather);
                
                // Set the weather data
                setWeather(currentWeather);
                // Update the temperature image dynamically
                updateTemperatureImage(currentWeather.temperature);
            } catch (err) {
                setError(err.message);
            } 

            
        };
        const getWeatherDescription = (code) => {
            if (code === 0 || code === 1) {
                return "Clear sky";
            }  else if (code === 2) {
                return "Partly cloudy";
            } else if (code === 3) {
                return "Overcast";
            } else if (code === 45 || code === 48) {
                return "Fog";
            } else if (code >= 51 && code <= 55) {
                return "Drizzle";
            } else if (code >= 61 && code <= 65) {
                return "Rain";
            } else if (code >= 71 && code <= 75) {
                return "Snowfall";
            } else {
                return "Unknown weather condition";
            }
        };

        const [temperatureImage, setTemperatureImage] = useState(cloud_imag);

        const updateTemperatureImage = (temp) => {
            if (temp <= 10) {
                setTemperatureImage(snow_imag);
            } else if (temp > 10 && temp <= 20) {
                setTemperatureImage(cloud_imag);
            } else if (temp > 20 && temp <= 30) {
                setTemperatureImage(drizzle_imag);
            } else if (temp >= 31) {
                setTemperatureImage(rain_imag);
            }
        };

    return ( 
        <div className='main_app'>
            
            <div className="search_bar">
                <input type="text" placeholder='type city' value={city}
                    onChange={(e) => setCity(e.target.value)}/>
                <img src={search_imag} alt=""  onClick={handleSearch} />
            </div>
            <img src={temperatureImage} alt="" className='Weather_icon' onClick={handleSearch} />
            {weather && (
                    <> 
            <p className='temperature' >{weather.temperature} °C</p>
            <p className='location'>{city}</p>

            <div className="Weather_data">
                <div className="coloms">
                    <img src={humidity_imag} alt="" />
                    <div className="">
                        <p>{getWeatherDescription(weather.weathercode)}</p>
                        <span>weather condition</span>
    
                    </div>
                </div>
                <div className="coloms">
                    <img src={wind_imag} alt="" />
                    <div className="">
                        <p>{weather.windspeed}</p>
                        <span>wimd speed</span>
                        
    
                    </div>
                </div>

                
            </div>
            </>
            )} 
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        
        
        
    )
    }

    export default Weather
