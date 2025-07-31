async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://wttr.in/${city}?format=j1`;

  try {
    document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";

    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("weatherResult").innerHTML = "";
      throw new Error("City not found or API error.");
    }

    const data = await response.json();
    const current = data.current_condition[0];
    const weatherDesc = current.weatherDesc[0].value.toLowerCase();

    const isRaining = weatherDesc.includes("rain");
    const rainStatus = isRaining
      ? "🌧️ It is currently raining."
      : "☀️ No rain at the moment.";

    const weatherHTML = `
      <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
      <p><strong>Temperature:</strong> ${current.temp_C}°C</p>
      <p><strong>Weather:</strong> ${current.weatherDesc[0].value}</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p>
      <p><strong>Wind:</strong> ${current.windspeedKmph} km/h</p>
      <p><strong>Feels Like:</strong> ${current.FeelsLikeC}°C</p>
      <p><strong>Status:</strong> ${rainStatus}</p>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      `<p style="color:red;">${error.message}</p>`;
  }
}
