document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found");
      return;
    }
    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();
    const temp = weatherData.current_weather.temperature;
    const condition = weatherData.current_weather.weathercode;
    const conditions = {
      0: { desc: "Clear sky", icon: "☀️" },
      1: { desc: "Mainly clear", icon: "🌤" },
      2: { desc: "Partly cloudy", icon: "⛅" },
      3: { desc: "Overcast", icon: "☁️" },
      45: { desc: "Fog", icon: "🌫" },
      48: { desc: "Depositing rime fog", icon: "🌫" },
      51: { desc: "Light drizzle", icon: "🌦" },
      61: { desc: "Slight rain", icon: "🌧" },
      71: { desc: "Snowfall", icon: "❄️" },
      80: { desc: "Rain showers", icon: "🌧" },
      95: { desc: "Thunderstorm", icon: "⛈" }
    };
    const cond = conditions[condition] || { desc: "Unknown", icon: "❔" };
    document.getElementById('cityName').textContent = `${name}, ${country}`;
    document.getElementById('temp').textContent = `${temp} °C`;
    document.getElementById('condition').textContent = cond.desc;
    document.getElementById('conditionIcon').textContent = cond.icon;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Please try again later.");
  }
});


