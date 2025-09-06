//Opencage -  933e577d37444ed5ab162b1f5f6e6371
//Geoapify - 744ff32fafd6489484a68e503580cf37



const cityInput = document.getElementById("city-input") as HTMLInputElement;
const cityName = document.getElementById("city-name") as HTMLHeadingElement;
const date = document.getElementById("date") as HTMLParagraphElement;
const temp = document.getElementById("temperature") as HTMLHeadingElement;
const desc = document.getElementById("description") as HTMLParagraphElement;
const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
const regionCountry = document.getElementById(
  "region-country"
) as HTMLParagraphElement;
const bgVideo = document.getElementById("bg-video") as HTMLVideoElement;
const h1 = document.querySelector("h1") as HTMLHeadingElement;
const cityImg = document.getElementById("city-img") as HTMLImageElement;
let scale = 8;
let initialDistance = 0;
let currentLongitude = 0;
let currentLatitude = 0;

const GEOAPIFY_API_KEY = "744ff32fafd6489484a68e503580cf37"; // apna Geoapify API Key
const OPENCAGE_API_KEY = "933e577d37444ed5ab162b1f5f6e6371"; // apna Opencage API Key



// Fetch Weather Data from API
async function fetchWeatherData(cityName: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=9d1caeeaf903493ca65125048251707&q=${cityName}&aqi=yes`
  );
  const data = await res.json();
  return data;
}

async function getCoordinates(cityName: string) {
  try {
    const res = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${OPENCAGE_API_KEY}`
    );

    const data = await res.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return {
        latitude: lat,
        longitude: lng,
      };
    }
    throw new Error("Location not found");
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return null;
  }
}


// Create a function to update map
function updateMap(longitude: number, latitude: number, zoomScale: number) {
  cityImg.src = `https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=300&height=300&center=lonlat:${longitude},${latitude}&zoom=${zoomScale}&apiKey=${GEOAPIFY_API_KEY}`;
}

function clampZoom(value: number): number {
  return Math.min(Math.max(value, 1), 20);
}

// Add touch events outside main function
cityImg.addEventListener("touchstart", (event) => {
  if (event.touches.length === 2) {
    event.preventDefault();
    initialDistance = Math.hypot(
      (event.touches[0]?.pageX ?? 0) - (event.touches[1]?.pageX ?? 0),
      (event.touches[0]?.pageY ?? 0) - (event.touches[1]?.pageY ?? 0)
    );
  }
});

cityImg.addEventListener("touchmove", (event) => {
  if (event.touches.length === 2) {
    event.preventDefault();
    const currentDistance = Math.hypot(
      (event.touches[0]?.pageX ?? 0) - (event.touches[1]?.pageX ?? 0),
      (event.touches[0]?.pageY ?? 0) - (event.touches[1]?.pageY ?? 0)
    );

    const delta = currentDistance - initialDistance;

    if (Math.abs(delta) > 10) {
      if (delta > 0 && scale < 20) {
        scale = clampZoom(scale + 0.2);
      } else if (delta < 0 && scale > 1) {
        scale = clampZoom(scale - 0.2);
      }
      updateMap(currentLongitude, currentLatitude, scale);
      initialDistance = currentDistance;
    }
  }
});

cityImg.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.deltaY < 0 && scale < 20) {
    scale = clampZoom(scale + 0.2);
  } else if (event.deltaY > 0 && scale > 1) {
    scale = clampZoom(scale - 0.2);
  }
  updateMap(currentLongitude, currentLatitude, scale);
});

// Main Function
async function main() {
  // Event Listener on Input to get the Weather Data
  cityInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      const city = cityInput.value;
      const weatherData = await fetchWeatherData(city);
      if (city === "") {
        alert("Please enter a city name");
        document.getElementById("weather-card")!.style.display = "none";
      } else if (weatherData.error) {
        alert(weatherData.error.message);
        document.getElementById("weather-card")!.style.display = "none";
      } else {
        document.getElementById("weather-card")!.style.display = "block";
        cityName!.innerText = weatherData.location.name;
        date!.innerText = weatherData.current.last_updated;
        temp!.innerText = weatherData.current.temp_c + "°C";
        desc!.innerText = weatherData.current.condition.text;
        weatherIcon!.src = weatherData.current.condition.icon;
        regionCountry!.innerText = `${weatherData.location.region}, ${weatherData.location.country}`;

        // Get coordinates and set city image
      const coordinates = await getCoordinates(cityName!.innerText);
      if (coordinates) {
        const { latitude, longitude } = coordinates;
        currentLatitude = latitude;
        currentLongitude = longitude;
        scale = 8; // Reset zoom level for new city
        updateMap(longitude, latitude, scale);
      }



        const textGradient = (css: string) => {
          h1.style.background = css;
          h1.style.backgroundClip = "text";
          h1.style.webkitBackgroundClip = "text";
          h1.style.color = "transparent";
          h1.style.webkitTextFillColor = "transparent";
        };

        if (
          desc!.innerText.includes("rain") ||
          desc!.innerText.includes("Rain")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2023/09/23/181916-867576005_large.mp4";
          textGradient("linear-gradient(90deg, #4e54c8, #8e9eab, #eef2f3)");
        } else if (
          desc!.innerText.includes("cloud") ||
          desc!.innerText.includes("Cloud")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2024/07/14/221180_large.mp4";
          textGradient("linear-gradient(90deg, #b1bfd8, #8e9eab, #eef2f3)");
        } else if (
          desc!.innerText.includes("sunny") ||
          desc!.innerText.includes("Sunny")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2023/06/25/168788-839828005_large.mp4";
          textGradient("linear-gradient(90deg, #ffd6e0, #fff6b7, #f7c59f)"); // warm yellow-pink
        } else if (
          desc!.innerText.includes("snow") ||
          desc!.innerText.includes("Snow")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2023/11/12/188778-883818276_large.mp4";
          textGradient("linear-gradient(90deg, #e0eafc, #b1bfd8, #ffffff)"); // icy blue-white
        } else if (
          desc!.innerText.includes("wind") ||
          desc!.innerText.includes("Wind")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2022/04/04/112957-696336342_large.mp4";
          textGradient("linear-gradient(90deg, #74ebd5, #ACB6E5)"); // breezy teal
        } else if (
          desc!.innerText.includes("fog") ||
          desc!.innerText.includes("Fog")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2021/08/04/83880-585600454_large.mp4";
          textGradient("linear-gradient(90deg, #C9D6FF, #E2E2E2)"); // misty light
        } else if (
          desc!.innerText.includes("mist") ||
          desc!.innerText.includes("Mist")
        ) {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2020/04/21/36753-412873649_large.mp4";
          textGradient("linear-gradient(90deg, #e0eafc, #c1cbe1, #f5f7fa)"); // light blue-gray
        } else {
          bgVideo.src =
            "https://cdn.pixabay.com/video/2016/09/14/5278-182817488_large.mp4";
          textGradient("90deg,#ff75a0,#674ea7,#3a2e4e,#ff75a0");
        }
      }
    }
  });
}
main();
