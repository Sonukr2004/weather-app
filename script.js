document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "81d7583cf914906bbadf78d76c483810";

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);  // ✅ Fixed variable name
        } catch (error) {
            showError();  // ✅ Now correctly shows error
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        try {
            const response = await fetch(url);
            console.log("API Response:", response);

            if (!response.ok) {
                console.error("Error: ", response.status, response.statusText);
                throw new Error("City not found");
            }

            const data = await response.json();
            console.log("Weather Data:", data);
            return data;
        } catch (error) {
            console.error("Fetch Error:", error);
            throw error;
        }
    }

    function displayWeatherData(data) {
        console.log(data);

        const { name, main, weather } = data;

        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        weatherInfo.classList.remove('hidden');  
        errorMessage.classList.add("hidden");  
    }

    function showError(message = "City not found") {
        weatherInfo.classList.add("hidden");  // ✅ Hide weather info
        errorMessage.classList.remove("hidden");  // ✅ Show error message
        errorMessage.textContent = message;
    }
});

//role of api
// The OpenWeatherMap API provides weather data for a given city when requested.
// You send a request (URL with parameters), and the API responds with JSON data containing weather details.
// Your app processes and displays this data in the UI.
