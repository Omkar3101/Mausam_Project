//Opencage -  933e577d37444ed5ab162b1f5f6e6371
//Geoapify - 744ff32fafd6489484a68e503580cf37
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var cityInput = document.getElementById("city-input");
var cityName = document.getElementById("city-name");
var date = document.getElementById("date");
var temp = document.getElementById("temperature");
var desc = document.getElementById("description");
var weatherIcon = document.getElementById("weather-icon");
var regionCountry = document.getElementById("region-country");
var bgVideo = document.getElementById("bg-video");
var h1 = document.querySelector("h1");
var cityImg = document.getElementById("city-img");
var scale = 8;
var initialDistance = 0;
var currentLongitude = 0;
var currentLatitude = 0;
var GEOAPIFY_API_KEY = "744ff32fafd6489484a68e503580cf37"; // apna Geoapify API Key
var OPENCAGE_API_KEY = "933e577d37444ed5ab162b1f5f6e6371"; // apna Opencage API Key
// Fetch Weather Data from API
function fetchWeatherData(cityName) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://api.weatherapi.com/v1/current.json?key=9d1caeeaf903493ca65125048251707&q=".concat(cityName, "&aqi=yes"))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
function getCoordinates(cityName) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _a, lat, lng, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://api.opencagedata.com/geocode/v1/json?q=".concat(cityName, "&key=").concat(OPENCAGE_API_KEY))];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _b.sent();
                    if (data.results.length > 0) {
                        _a = data.results[0].geometry, lat = _a.lat, lng = _a.lng;
                        return [2 /*return*/, {
                                latitude: lat,
                                longitude: lng,
                            }];
                    }
                    throw new Error("Location not found");
                case 3:
                    error_1 = _b.sent();
                    console.error("Error getting coordinates:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Create a function to update map
function updateMap(longitude, latitude, zoomScale) {
    cityImg.src = "https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=300&height=300&center=lonlat:".concat(longitude, ",").concat(latitude, "&zoom=").concat(zoomScale, "&apiKey=").concat(GEOAPIFY_API_KEY);
}
function clampZoom(value) {
    return Math.min(Math.max(value, 1), 20);
}
// Add touch events outside main function
cityImg.addEventListener("touchstart", function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (event.touches.length === 2) {
        event.preventDefault();
        initialDistance = Math.hypot(((_b = (_a = event.touches[0]) === null || _a === void 0 ? void 0 : _a.pageX) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = event.touches[1]) === null || _c === void 0 ? void 0 : _c.pageX) !== null && _d !== void 0 ? _d : 0), ((_f = (_e = event.touches[0]) === null || _e === void 0 ? void 0 : _e.pageY) !== null && _f !== void 0 ? _f : 0) - ((_h = (_g = event.touches[1]) === null || _g === void 0 ? void 0 : _g.pageY) !== null && _h !== void 0 ? _h : 0));
    }
});
cityImg.addEventListener("touchmove", function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (event.touches.length === 2) {
        event.preventDefault();
        var currentDistance = Math.hypot(((_b = (_a = event.touches[0]) === null || _a === void 0 ? void 0 : _a.pageX) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = event.touches[1]) === null || _c === void 0 ? void 0 : _c.pageX) !== null && _d !== void 0 ? _d : 0), ((_f = (_e = event.touches[0]) === null || _e === void 0 ? void 0 : _e.pageY) !== null && _f !== void 0 ? _f : 0) - ((_h = (_g = event.touches[1]) === null || _g === void 0 ? void 0 : _g.pageY) !== null && _h !== void 0 ? _h : 0));
        var delta = currentDistance - initialDistance;
        if (Math.abs(delta) > 10) {
            if (delta > 0 && scale < 20) {
                scale = clampZoom(scale + 0.2);
            }
            else if (delta < 0 && scale > 1) {
                scale = clampZoom(scale - 0.2);
            }
            updateMap(currentLongitude, currentLatitude, scale);
            initialDistance = currentDistance;
        }
    }
});
cityImg.addEventListener("wheel", function (event) {
    event.preventDefault();
    if (event.deltaY < 0 && scale < 20) {
        scale = clampZoom(scale + 0.2);
    }
    else if (event.deltaY > 0 && scale > 1) {
        scale = clampZoom(scale - 0.2);
    }
    updateMap(currentLongitude, currentLatitude, scale);
});
// Main Function
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // Event Listener on Input to get the Weather Data
            cityInput.addEventListener("keypress", function (event) { return __awaiter(_this, void 0, void 0, function () {
                var city, weatherData, coordinates, latitude, longitude, textGradient;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(event.key === "Enter")) return [3 /*break*/, 5];
                            city = cityInput.value;
                            return [4 /*yield*/, fetchWeatherData(city)];
                        case 1:
                            weatherData = _a.sent();
                            if (!(city === "")) return [3 /*break*/, 2];
                            alert("Please enter a city name");
                            document.getElementById("weather-info").style.display = "none";
                            document.getElementById("city-img").style.display = "none";
                            return [3 /*break*/, 5];
                        case 2:
                            if (!weatherData.error) return [3 /*break*/, 3];
                            alert(weatherData.error.message);
                            document.getElementById("weather-info").style.display = "none";
                            document.getElementById("city-img").style.display = "none";
                            return [3 /*break*/, 5];
                        case 3:
                            document.getElementById("weather-info").style.display = "block";
                            document.getElementById("city-img").style.display = "block";
                            cityName.innerText = weatherData.location.name;
                            date.innerText = weatherData.current.last_updated;
                            temp.innerText = weatherData.current.temp_c + "°C";
                            desc.innerText = weatherData.current.condition.text;
                            weatherIcon.src = weatherData.current.condition.icon;
                            regionCountry.innerText = "".concat(weatherData.location.region, ", ").concat(weatherData.location.country);
                            return [4 /*yield*/, getCoordinates(cityName.innerText)];
                        case 4:
                            coordinates = _a.sent();
                            if (coordinates) {
                                latitude = coordinates.latitude, longitude = coordinates.longitude;
                                currentLatitude = latitude;
                                currentLongitude = longitude;
                                scale = 8; // Reset zoom level for new city
                                updateMap(longitude, latitude, scale);
                            }
                            textGradient = function (css) {
                                h1.style.background = css;
                                h1.style.backgroundClip = "text";
                                h1.style.webkitBackgroundClip = "text";
                                h1.style.color = "transparent";
                                h1.style.webkitTextFillColor = "transparent";
                            };
                            if (desc.innerText.includes("rain") ||
                                desc.innerText.includes("Rain")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2023/09/23/181916-867576005_large.mp4";
                                textGradient("linear-gradient(90deg, #4e54c8, #8e9eab, #eef2f3)");
                            }
                            else if (desc.innerText.includes("cloud") ||
                                desc.innerText.includes("Cloud")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2024/07/14/221180_large.mp4";
                                textGradient("linear-gradient(90deg, #b1bfd8, #8e9eab, #eef2f3)");
                            }
                            else if (desc.innerText.includes("sunny") ||
                                desc.innerText.includes("Sunny")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2023/06/25/168788-839828005_large.mp4";
                                textGradient("linear-gradient(90deg, #ffd6e0, #fff6b7, #f7c59f)"); // warm yellow-pink
                            }
                            else if (desc.innerText.includes("snow") ||
                                desc.innerText.includes("Snow")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2023/11/12/188778-883818276_large.mp4";
                                textGradient("linear-gradient(90deg, #e0eafc, #b1bfd8, #ffffff)"); // icy blue-white
                            }
                            else if (desc.innerText.includes("wind") ||
                                desc.innerText.includes("Wind")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2022/04/04/112957-696336342_large.mp4";
                                textGradient("linear-gradient(90deg, #74ebd5, #ACB6E5)"); // breezy teal
                            }
                            else if (desc.innerText.includes("fog") ||
                                desc.innerText.includes("Fog")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2021/08/04/83880-585600454_large.mp4";
                                textGradient("linear-gradient(90deg, #C9D6FF, #E2E2E2)"); // misty light
                            }
                            else if (desc.innerText.includes("mist") ||
                                desc.innerText.includes("Mist")) {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2020/04/21/36753-412873649_large.mp4";
                                textGradient("linear-gradient(90deg, #e0eafc, #c1cbe1, #f5f7fa)"); // light blue-gray
                            }
                            else {
                                bgVideo.src =
                                    "https://cdn.pixabay.com/video/2016/09/14/5278-182817488_large.mp4";
                                textGradient("90deg,#ff75a0,#674ea7,#3a2e4e,#ff75a0");
                            }
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
main();
