const key="bcee8e0683f56c56cac3402bf0ccdf9b";

const sunsetElement = document.getElementById("sunset-time");
const sunriseElement = document.getElementById("sunrise-time");
const windElement = document.getElementById("wind");
const tempElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const mainIconElement = document.getElementById("main-section-icon");
const zoneElement = document.getElementById("zone");


let data = null;
let geoData =null;

async function getWeatherData() {
	navigator.geolocation.getCurrentPosition(function (pos) {console.log(pos.coords);
        geoData = pos.coords;
    });
   console.log(geoData);
	
	let res = {};
	 if (geoData) {
		res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.latitude}&lon=${geoData.longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${key}`
		);
	} else {
		res = await fetch(
			"https://api.openweathermap.org/data/2.5/weather?lat=35.7642515&lon=10.8112885&units=metric&exclude=minutely,hourly,alerts&appid=bcee8e0683f56c56cac3402bf0ccdf9b"
		);
	}
    data=await res.json();
   
    const sunrise = new Date(data.sys.sunrise).toLocaleTimeString("en");
	sunriseElement.innerHTML= sunrise;
   
	const sunset = new Date(data.sys.sunset).toLocaleTimeString("en");
	sunsetElement.innerText = `${sunset}`;
	windElement.innerText = `${data.wind.speed} km/h`;
	tempElement.innerText = `${data.main.temp} °C`;
	descriptionElement.innerHTML=data.weather[0].description;
    zoneElement.innerText=data.name

}
getWeatherData()
