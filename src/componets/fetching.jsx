const getWeatherData = async (cityName) => {
    const apiKey = "0e2cab845e9248608155fcb06fb21930"; // Replace with your OpenCage API key

    try {
        // Fetch coordinates (latitude and longitude) using OpenCage Geocoder API
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${apiKey}`;
        const geocodeResponse = await fetch(geocodeUrl);

        if (!geocodeResponse.ok) {
            throw new Error("Failed to fetch coordinates.");
        }

        const geocodeData = await geocodeResponse.json();
        if (geocodeData.results.length === 0) {
            throw new Error("City not found.");
        }

        const { lat, lng } = geocodeData.results[0].geometry;

        // Fetch weather data using Open-Meteo API with coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
       
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();
        return weatherData.current_weather; // Return the current weather data
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        throw error;
    }
};

export default getWeatherData;
