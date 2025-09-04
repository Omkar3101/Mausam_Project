const cityInput = document.getElementById("city-input") as HTMLInputElement;
const cityInputBtn = document.getElementById(
  "city-input-btn"
) as HTMLButtonElement;
const cityName = document.getElementById("city-name") as HTMLHeadingElement;
const date = document.getElementById("date") as HTMLParagraphElement;
const temp = document.getElementById("temperature") as HTMLHeadingElement;
const desc = document.getElementById("description") as HTMLParagraphElement;
const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
const regionCountry = document.getElementById(
  "region-country"
) as HTMLParagraphElement;
const bgVideo = document.getElementById("bg-video") as HTMLVideoElement;

// Fetch Weather Data from API
async function fetchWeatherData(cityName: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=9d1caeeaf903493ca65125048251707&q=${cityName}&aqi=yes`
  );
  const data = await res.json();
  return data;
}

// Main Function
async function main() {
  // Event Listener on Button to get the Weather Data
  cityInputBtn?.addEventListener("click", async () => {
    const city = cityInput.value;
    const weatherData = await fetchWeatherData(city);

    if (city === "") {
      alert("Please enter a city name");
      document.getElementById("weather-info")!.style.display = "none";
    } else if (weatherData.error) {
      alert(weatherData.error.message);
      document.getElementById("weather-info")!.style.display = "none";
    } else {
      document.getElementById("weather-info")!.style.display = "block";
      console.log(weatherData);
      cityName!.innerText = weatherData.location.name;
      console.log(cityName);
      date!.innerText = weatherData.current.last_updated;
      temp!.innerText = weatherData.current.temp_c + "°C";
      desc!.innerText = weatherData.current.condition.text;
      weatherIcon!.src = weatherData.current.condition.icon;
      regionCountry!.innerText = `${weatherData.location.region}, ${weatherData.location.country}`;

      if (desc!.innerText.includes("rain") || desc!.innerText.includes('Rain')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2023/09/23/181916-867576005_large.mp4";
      } else if (desc!.innerText.includes("cloud") || desc!.innerText.includes('Cloud')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2024/07/14/221180_large.mp4";
      } else if (desc!.innerText.includes("sunny") || desc!.innerText.includes('Sunny')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2023/06/25/168788-839828005_large.mp4";
      } else if (desc!.innerText.includes("snow") || desc!.innerText.includes('Snow')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2023/11/12/188778-883818276_large.mp4";
      } else if (desc!.innerText.includes("wind") || desc!.innerText.includes('Wind')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2022/04/04/112957-696336342_large.mp4";
      } else if (desc!.innerText.includes("fog") || desc!.innerText.includes('Fog')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2021/08/04/83880-585600454_large.mp4";
      } else if (desc!.innerText.includes("mist") || desc!.innerText.includes('Mist')) {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2020/04/21/36753-412873649_large.mp4";
      } else {
        bgVideo.src =
          "https://cdn.pixabay.com/video/2016/09/14/5278-182817488_large.mp4";
      }
    }
  });
}

main();
