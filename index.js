window.onload = function () {
  let location = "New York";
  let formattedLocation = location.toLowerCase().split(" ").join("-");

  //cache DOM
  //header
  const fahrenheit = document.querySelector("#fahrenheit");
  const celsius = document.querySelector("#celsius");
  const temp = document.querySelectorAll(".temp");

  //search form
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search");
  const searchBtn = document.querySelector("#search-btn");
  const suggestions = document.querySelector("#suggestions");

  // arrows
  const leftArrow = document.querySelector("#left-arrow");
  const rightArrow = document.querySelector("#right-arrow");
  const leftArrowDaily = document.querySelector("#left-arrow-daily");
  const rightArrowDaily = document.querySelector("#right-arrow-daily");
  const dailyArrows = document.querySelector("#daily-arrows");

  //current weather
  const currentLocation = document.querySelector("#current-location");
  const currentRegion = document.querySelector("#current-region");
  const currentCountry = document.querySelector("#current-country");
  const currentDate = document.querySelector("#current-date");
  const currentCondition = document.querySelector("#current-condition");
  const currentConditionIcon = document.querySelector(
    "#current-condition-icon"
  );
  const currentTemp = document.querySelector("#current-temp");
  const currentFeel = document.querySelector("#current-feel");
  const currentHigh = document.querySelector("#current-high");
  const currentLow = document.querySelector("#current-low");
  const currentRain = document.querySelector("#current-rain");
  const currentSnow = document.querySelector("#current-snow");
  const currentPrecip = document.querySelector("#current-precip");

  //details
  const detailsWind = document.querySelector("#details-wind");
  const detailsSunrise = document.querySelector("#details-sunrise");
  const detailsSunset = document.querySelector("#details-sunset");
  const detailsHumidity = document.querySelector("#details-humidity");
  const detailsUV = document.querySelector("#details-uv");

  //daily forecast
  const day = document.querySelectorAll(".day");
  const dailyForecastCondition = document.querySelectorAll(
    ".daily-forecast-condition"
  );
  const dailyConditionIcon = document.querySelectorAll("#daily-condition-icon");
  const dailyForecastHigh = document.querySelectorAll(".daily-forecast-high");
  const dailyForecastLow = document.querySelectorAll(".daily-forecast-low");
  const dailyForecastRain = document.querySelectorAll(".daily-forecast-rain");
  const dailyForecastSnow = document.querySelectorAll(".daily-forecast-snow");
  const dailyForecastPrecip = document.querySelectorAll(
    ".daily-forecast-precip"
  );
  const dailyForecastContainer = document.querySelector(
    "#daily-forecast-container"
  );
  const dailyForecastDisplay = document.querySelector(
    "#display-daily-forecast"
  );
  const chevronImg = document.querySelector("#chevron");

  //hourly forecast
  const hourForecast = document.querySelectorAll(".hour");
  const hourlyForecastCondition = document.querySelectorAll(
    ".hourly-forecast-condition"
  );
  const hourlyConditionIcon = document.querySelectorAll(
    "#hourly-condition-icon"
  );
  const hourlyForecastTemp = document.querySelectorAll(".hourly-forecast-temp");
  const hourlyForecastRain = document.querySelectorAll(".hourly-forecast-rain");
  const hourlyForecastSnow = document.querySelectorAll(".hourly-forecast-snow");
  const hourlyForecastPrecip = document.querySelectorAll(
    ".hourly-forecast-precip"
  );
  const hourlyForecastContainer = document.querySelector(
    "#hourly-forecast-container"
  );

  //photo credits
  const photoCredits = document.querySelector("#photo-credits");

  //declare functions
  async function getCurrentWeather(url) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let weatherData = await response.json();
      let currentWeatherObj = await weatherData;
      return currentWeatherObj;
    } catch (error) {
      console.log("Error");
    }
  }

  function formatDateTimeF(obj) {
    localDateTime = new Date(obj.location.localtime).toString().split(" ", 5);
    let min = localDateTime[4].slice(3, -3);
    let hour = localDateTime[4].slice(0, -6);
    let string;
    if (parseInt(hour) > 12) {
      hour = hour - 12;
      string = `${localDateTime[0]}, ${localDateTime[1]} ${localDateTime[2]} ${localDateTime[3]} at ${hour}:${min} PM`;
    } else if (parseInt(hour) === 0) {
      hour = 12;
      string = `${localDateTime[0]}, ${localDateTime[1]} ${localDateTime[2]} ${localDateTime[3]} at ${hour}:${min} AM`;
    } else if (parseInt(hour) === 12) {
      string = `${localDateTime[0]}, ${localDateTime[1]} ${localDateTime[2]} ${localDateTime[3]} at ${hour}:${min} PM`;
    } else {
      string = `${localDateTime[0]}, ${localDateTime[1]} ${localDateTime[2]} ${localDateTime[3]} at ${hour}:${min} AM`;
    }
    return string;
  }

  function formatDateTimeC(obj) {
    localDateTime = new Date(obj.location.localtime).toString().split(" ", 5);
    let time = localDateTime[4].slice(0, -3);
    let string = `${localDateTime[0]}, ${localDateTime[1]} ${localDateTime[2]} ${localDateTime[3]} at ${time}`;
    return string;
  }

  async function getHour(url) {
    let obj = await getCurrentWeather(url);
    let dateTime = formatDateTimeC(obj);
    let dateTimeArr = dateTime.split(" ");
    let hour = dateTimeArr[5].split(":")[0];
    return hour;
  }

  async function populateCurrentWeatherF(url) {
    let obj = await getCurrentWeather(url);
    currentDate.textContent = formatDateTimeF(obj);
    currentLocation.textContent = `${obj.location.name}`;
    if (obj.location.region.length > 0) {
      currentRegion.textContent = `${obj.location.region},`;
    } else {
      currentRegion.textContent = "";
    }
    currentCountry.textContent = `${obj.location.country}`;
    currentCondition.textContent = `${obj.current.condition.text}`;
    currentConditionIcon.src = `https:${obj.current.condition.icon}`;
    currentTemp.textContent = `${obj.current.temp_f}\u00B0F`;
    currentFeel.textContent = `Feels Like: ${obj.current.feelslike_f}\u00B0F`;

    currentCondition.style.textTransform = "capitalize";
    let forecastArr = await getForecast(
      `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
    );
    currentHigh.textContent = `High: ${forecastArr[0].day.maxtemp_f}\u00B0F`;
    currentLow.textContent = `Low: ${forecastArr[0].day.mintemp_f}\u00B0F`;
    currentRain.textContent = `Chance of Rain: ${forecastArr[0].day.daily_chance_of_rain}%`;
    currentSnow.textContent = `Chance of Snow: ${forecastArr[0].day.daily_chance_of_snow}%`;
    currentPrecip.textContent = `Precipitation: ${forecastArr[0].day.totalprecip_in} in`;
  }

  async function populateCurrentWeatherC(url) {
    let obj = await getCurrentWeather(url);
    currentDate.textContent = formatDateTimeC(obj);
    currentLocation.textContent = `${obj.location.name}`;
    if (obj.location.region.length > 0) {
      currentRegion.textContent = `${obj.location.region},`;
    } else {
      currentRegion.textContent = "";
    }
    currentCountry.textContent = `${obj.location.country}`;
    currentCondition.textContent = `${obj.current.condition.text}`;
    currentConditionIcon.src = `https:${obj.current.condition.icon}`;
    currentTemp.textContent = `${obj.current.temp_c}\u00B0C`;
    currentFeel.textContent = `Feels Like: ${obj.current.feelslike_c}\u00B0C`;

    currentCondition.style.textTransform = "capitalize";
    let forecastArr = await getForecast(
      `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
    );
    currentHigh.textContent = `High: ${forecastArr[0].day.maxtemp_c}\u00B0C`;
    currentLow.textContent = `Low: ${forecastArr[0].day.mintemp_c}\u00B0C`;
    currentPrecip.textContent = `Precipitation: ${forecastArr[0].day.totalprecip_mm} mm`;
  }

  async function populateCurrentDetailsF(url) {
    let obj = await getCurrentWeather(url);
    detailsWind.textContent = `Wind: ${obj.current.wind_mph} MPH ${obj.current.wind_dir}`;
    detailsHumidity.textContent = `Humidity: ${obj.current.humidity}%`;
    detailsUV.textContent = `UV Index: ${obj.current.uv}`;
    let forecastArr = await getForecast(
      `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
    );
    detailsSunrise.textContent = `Sunrise: ${forecastArr[0].astro.sunrise}`;
    detailsSunset.textContent = `Sunset: ${forecastArr[0].astro.sunset}`;
  }

  async function populateCurrentDetailsC(url) {
    let obj = await getCurrentWeather(url);
    detailsWind.textContent = `Wind: ${obj.current.wind_kph} KPH ${obj.current.wind_dir}`;
    detailsHumidity.textContent = `Humidity: ${obj.current.humidity}%`;
    detailsUV.textContent = `UV Index: ${obj.current.uv}`;
    let forecastArr = await getForecast(
      `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
    );

    let sunrisePeriod = forecastArr[0].astro.sunrise.slice(-2);
    let sunriseMinute = forecastArr[0].astro.sunrise.slice(3, -3);
    let sunriseHour = parseInt(forecastArr[0].astro.sunrise.split(":", 1));

    if (sunrisePeriod === "PM") {
      if (sunriseHour === 12) {
        detailsSunrise.textContent = `SunRise: ${sunriseHour}:${sunriseMinute}`;
      } else {
        detailsSunrise.textContent = `Sunrise: ${
          sunriseHour + 12
        }:${sunriseMinute}`;
      }
    } else if (sunrisePeriod === "AM") {
      if (sunriseHour === 12) {
        sunriseHour = 0;
        detailsSunrise.textContent = `Sunrise: ${sunriseHour}:${sunriseMinute}`;
      } else {
        detailsSunrise.textContent = `Sunrise: ${sunriseHour}:${sunriseMinute}`;
      }
    }

    let sunsetPeriod = forecastArr[0].astro.sunset.slice(-2);
    let sunsetMinute = forecastArr[0].astro.sunset.slice(3, -3);
    let sunsetHour = parseInt(forecastArr[0].astro.sunset.split(":", 1));

    if (sunsetPeriod === "PM") {
      if (sunsetHour === 12) {
        detailsSunset.textContent = `Sunset: ${sunsetHour}:${sunsetMinute}`;
      } else {
        detailsSunset.textContent = `Sunset: ${
          sunsetHour + 12
        }:${sunsetMinute}`;
      }
    } else if (sunsetPeriod === "AM") {
      if (sunsetHour === 12) {
        sunsetHour = 0;
        detailsSunset.textContent = `Sunset: ${sunsetHour}:${sunsetMinute}`;
      } else {
        detailsSunset.textContent = `Sunset: ${sunsetHour}:${sunsetMinute}`;
      }
    }
  }

  async function getForecast(url) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let forecastData = await response.json();
      let forecastObj = await forecastData.forecast.forecastday;
      return forecastObj;
    } catch (error) {
      console.log("Error");
    }
  }

  async function getDateTime(url) {
    let obj = await getCurrentWeather(url);
    obj.location.localtime;
    localDateTime = obj.location.localtime;
    dateTime = Date.parse(localDateTime);
    return dateTime;
  }

  async function populateForecastF(url) {
    let forecastArr = await getForecast(url);
    let dateTime = await getDateTime(
      `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
    );
    let iPlus;
    let addDays;
    let nonEpochDate;
    let formatInp;
    let string;

    for (let i = 0; i < 3; i++) {
      iPlus = i + 1;
      addDays = iPlus * 24 * 60 * 60 * 1000;
      nonEpochDate = new Date(dateTime + addDays);
      formatInp = nonEpochDate.toString().split(" ", 4);
      string = `${formatInp[0]}, ${formatInp[1]} ${formatInp[2]} ${formatInp[3]}`;
      day[i].textContent = string;
      dailyForecastCondition[i].textContent = `${
        forecastArr[i + 1].day.condition.text
      }`;
      dailyConditionIcon[i].src = `https:${
        forecastArr[i + 1].day.condition.icon
      }`;
      dailyForecastHigh[i].textContent = `High: ${
        forecastArr[i + 1].day.maxtemp_f
      }\u00B0F`;
      dailyForecastLow[i].textContent = `Low: ${
        forecastArr[i + 1].day.mintemp_f
      }\u00B0F`;
      dailyForecastRain[i].textContent = `Chance of Rain: ${
        forecastArr[i + 1].day.daily_chance_of_rain
      }%`;
      dailyForecastSnow[i].textContent = `Chance of Snow: ${
        forecastArr[i + 1].day.daily_chance_of_snow
      }%`;
      dailyForecastPrecip[i].textContent = `Precipitation: ${
        forecastArr[i + 1].day.totalprecip_in
      } in`;
    }
  }

  async function populateForecastC(url) {
    let forecastArr = await getForecast(url);
    let dateTime = await getDateTime(
      `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
    );
    let iPlus;
    let addDays;
    let nonEpochDate;
    let formatInp;
    let string;

    for (let i = 0; i < 3; i++) {
      iPlus = i + 1;
      addDays = iPlus * 24 * 60 * 60 * 1000;
      nonEpochDate = new Date(dateTime + addDays);
      formatInp = nonEpochDate.toString().split(" ", 4);
      string = `${formatInp[0]}, ${formatInp[1]} ${formatInp[2]} ${formatInp[3]}`;
      day[i].textContent = string;
      dailyForecastCondition[i].textContent = `${
        forecastArr[i + 1].day.condition.text
      }`;
      dailyConditionIcon[i].src = `https:${
        forecastArr[i + 1].day.condition.icon
      }`;
      dailyForecastHigh[i].textContent = `High: ${
        forecastArr[i + 1].day.maxtemp_c
      }\u00B0C`;
      dailyForecastLow[i].textContent = `Low: ${
        forecastArr[i + 1].day.mintemp_c
      }\u00B0C`;
      dailyForecastRain[i].textContent = `Chance of Rain: ${
        forecastArr[i + 1].day.daily_chance_of_rain
      }%`;
      dailyForecastSnow[i].textContent = `Chance of Snow: ${
        forecastArr[i + 1].day.daily_chance_of_snow
      }%`;
      dailyForecastPrecip[i].textContent = `Precipitation: ${
        forecastArr[i + 1].day.totalprecip_mm
      } mm`;
    }
  }

  async function getHourlyForecast(url) {
    try {
      let response = await fetch(url, { mode: "cors" });
      let hourlyForecastData = await response.json();
      let hourlyForecastObj = await hourlyForecastData.forecast.forecastday;

      return hourlyForecastObj;
    } catch (error) {
      console.log("Error");
    }
  }

  //create hour array
  let twelveHourArr = [
    "Midnight",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "Noon",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  async function populateHourlyForecastF(url) {
    let hourlyForecastArr = await getHourlyForecast(url);
    let hour = await getHour(url);
    let hourInt = parseInt(hour);

    for (let i = 0; i < 12; i++) {
      if (hourInt + i + 1 > 23) {
        hourForecast[i].textContent = `${twelveHourArr[hourInt + i + 1 - 24]}`;
        hourlyForecastCondition[i].textContent = `${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].condition.text
        }`;
        hourlyConditionIcon[i].src = `https:${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].condition.icon
        }`;
        hourlyForecastTemp[i].textContent = `${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].temp_f
        }\u00B0F`;
        hourlyForecastRain[i].textContent = `Chance of Rain: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].chance_of_rain
        }%`;
        hourlyForecastSnow[i].textContent = `Chance of Snow: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].chance_of_snow
        }%`;
        hourlyForecastPrecip[i].textContent = `Precipitation: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].precip_in
        } in`;
      } else {
        hourForecast[i].textContent = `${twelveHourArr[hourInt + i + 1]}`;
        hourlyForecastCondition[i].textContent = `${
          hourlyForecastArr[0].hour[hourInt + i + 1].condition.text
        }`;
        hourlyConditionIcon[i].src = `https:${
          hourlyForecastArr[0].hour[hourInt + i + 1].condition.icon
        }`;
        hourlyForecastTemp[i].textContent = `${
          hourlyForecastArr[0].hour[hourInt + i + 1].temp_f
        }\u00B0F`;
        hourlyForecastRain[i].textContent = `Chance of Rain: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].chance_of_rain
        }%`;
        hourlyForecastSnow[i].textContent = `Chance of Snow: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].chance_of_snow
        }%`;
        hourlyForecastPrecip[i].textContent = `Precipitation: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].precip_in
        } in`;
      }
    }
  }

  let TwentyFourHourArr = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  async function populateHourlyForecastC(url) {
    let hourlyForecastArr = await getHourlyForecast(url);
    let hour = await getHour(url);
    let hourInt = parseInt(hour);
    for (let i = 0; i < 12; i++) {
      if (hourInt + i + 1 > 23) {
        hourForecast[i].textContent = `${
          TwentyFourHourArr[hourInt + i + 1 - 24]
        }`;
        hourlyForecastCondition[i].textContent = `${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].condition.text
        }`;
        hourlyConditionIcon[i].src = `https:${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].condition.icon
        }`;
        hourlyForecastTemp[i].textContent = `${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].temp_c
        }\u00B0C`;
        hourlyForecastRain[i].textContent = `Chance of Rain: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].chance_of_rain
        }%`;
        hourlyForecastSnow[i].textContent = `Chance of Snow: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].chance_of_snow
        }%`;
        hourlyForecastPrecip[i].textContent = `Precipitation: ${
          hourlyForecastArr[1].hour[hourInt + i + 1 - 24].precip_mm
        } mm`;
      } else {
        hourForecast[i].textContent = `${TwentyFourHourArr[hourInt + i + 1]}`;
        hourlyForecastCondition[i].textContent = `${
          hourlyForecastArr[0].hour[hourInt + i + 1].condition.text
        }`;
        hourlyConditionIcon[i].src = `https:${
          hourlyForecastArr[0].hour[hourInt + i + 1].condition.icon
        }`;
        hourlyForecastTemp[i].textContent = `${
          hourlyForecastArr[0].hour[hourInt + i + 1].temp_c
        }\u00B0C`;
        hourlyForecastRain[i].textContent = `Chance of Rain: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].chance_of_rain
        }%`;
        hourlyForecastSnow[i].textContent = `Chance of Snow: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].chance_of_snow
        }%`;
        hourlyForecastPrecip[i].textContent = `Precipitation: ${
          hourlyForecastArr[0].hour[hourInt + i + 1].precip_mm
        } mm`;
      }
    }
  }

  async function getLocationSearchResults(url) {
    if (searchInput.value.length > 2) {
      try {
        let response = await fetch(url, { mode: "cors" });
        let searchResults = await response.json();
        return searchResults;
      } catch (error) {
        console.log("Error");
      }
    }
  }

  async function populateSearchResults(url) {
    let searchResults = await getLocationSearchResults(url);
    if (searchResults.length > 0) {
      suggestions.innerHTML = "";
      for (let i = 0; i < searchResults.length; i++) {
        const li = document.createElement("li");
        li.addEventListener("mousedown", () => {
          location = li.textContent;
          formattedLocation = location
            .toLowerCase()
            .split(" ")
            .join("-")
            .split(",")
            .join("-");
          populateAll();
          searchForm.reset();
          suggestions.innerHTML = "";
        });
        if (searchResults[i].region === "") {
          li.textContent = `${searchResults[i].name}, ${searchResults[i].country}`;
        } else {
          li.textContent = `${searchResults[i].name}, ${searchResults[i].region}, ${searchResults[i].country}`;
        }
        suggestions.appendChild(li);
      }
    } else if (searchResults.length > 5) {
      suggestions.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const li = document.createElement("li");
        li.addEventListener("mousedown", () => {
          location = li.textContent;
          formattedLocation = location
            .toLowerCase()
            .split(" ")
            .join("-")
            .split(",")
            .join("-");
          populateAll();
          searchForm.reset();
          suggestions.innerHTML = "";
        });
        if (searchResults[i].region === "") {
          li.textContent = `${searchResults[i].name}, ${searchResults[i].country}`;
        } else {
          li.textContent = `${searchResults[i].name}, ${searchResults[i].region}, ${searchResults[i].country}`;
        }
        suggestions.appendChild(li);
      }
    } else if (searchResults.length === 0) {
      suggestions.innerHTML = "";
    }
  }

  function toggleTemp() {
    for (let j = 0; j < temp.length; j++) {
      temp[j].classList.remove("active");
    }
  }

  function toggleDailyForecastDisplay() {
    if (dailyForecastContainer.style.display === "none") {
      dailyForecastContainer.style.display = "flex";
      dailyArrows.style.display = "flex";
      chevronImg.src = "./images/chevron-up.svg";
    } else {
      dailyForecastContainer.style.display = "none";
      dailyArrows.style.display = "none";
      chevronImg.src = "images/chevron-down.svg";
    }
  }

  function scrollLeft() {
    hourlyForecastContainer.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    hourlyForecastContainer.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }

  function scrollLeftDaily(event) {
    event.stopImmediatePropagation();
    dailyForecastContainer.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  function scrollRightDaily(event) {
    event.stopImmediatePropagation();
    dailyForecastContainer.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }

  function populateAll() {
    if (celsius.classList.contains("active")) {
      populateCurrentWeatherC(
        `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
      );

      populateCurrentDetailsC(
        `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
      );

      populateForecastC(
        `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
      );

      populateHourlyForecastC(
        `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
      );
    } else if (fahrenheit.classList.contains("active")) {
      populateCurrentWeatherF(
        `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
      );

      populateCurrentDetailsF(
        `https://api.weatherapi.com/v1/current.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}`
      );

      populateForecastF(
        `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
      );

      populateHourlyForecastF(
        `http://api.weatherapi.com/v1/forecast.json?key=f7c3f61dbc41432c855230637232706&q=${formattedLocation}&days=8&aqi=no&alerts=no`
      );
    }
  }

  //invoke functions
  populateAll();

  //bind events
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let search = document.querySelector("#search").value;
    location = search;
    formattedLocation = location.toLowerCase().split(" ").join("-");

    populateAll();
    searchForm.reset();
    suggestions.innerHTML = "";
  });

  searchInput.addEventListener("input", () => {
    let search = document.querySelector("#search").value;
    let formattedSearchLocation;
    if (search.length > 2) {
      formattedSearchLocation = search.toLowerCase().split(" ").join("-");
      populateSearchResults(
        `https://api.weatherapi.com/v1/search.json?key=f7c3f61dbc41432c855230637232706&q=${formattedSearchLocation}`
      );
    } else {
      suggestions.innerHTML = "";
    }
    searchInput.addEventListener("blur", () => {
      suggestions.style.display = "none";
    });
    searchInput.addEventListener("focus", () => {
      suggestions.style.display = "block";
    });
  });

  dailyForecastDisplay.addEventListener("click", () => {
    toggleDailyForecastDisplay();
  });

  for (let i = 0; i < temp.length; i++) {
    temp[i].addEventListener("click", () => {
      toggleTemp();
      temp[i].classList.add("active");
    });
  }

  celsius.addEventListener("click", () => {
    populateAll();
  });

  fahrenheit.addEventListener("click", () => {
    populateAll();
  });

  leftArrow.addEventListener("click", () => {
    scrollLeft();
  });

  rightArrow.addEventListener("click", () => {
    scrollRight();
  });

  leftArrowDaily.addEventListener("click", (event) => {
    scrollLeftDaily(event);
  });

  rightArrowDaily.addEventListener("click", (event) => {
    scrollRightDaily(event);
  });
};
