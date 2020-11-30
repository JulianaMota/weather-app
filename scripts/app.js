import anime from '../node_modules/animejs/lib/anime.es.js';

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
	//destruction properties
	const { cityDets, weather, day } = data;
	

	//update
	details.innerHTML = `
        <h2 class="my-3">${cityDets.EnglishName}</h2>
        <p class="my-3">${weather.WeatherText}</p>
        <div class="display-4 my-5">
            <span class="temp">${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
		</div>
		<div class="day-forecast">
			<h3>Day Weather</h3>
			<div class="day-back">
				<h4>Day</h4>
				<div class="layout-day-div">
					<img src="assets/svg/${day.DailyForecasts[0].Day.Icon}.svg" alt="icon">
					<p>${day.DailyForecasts[0].Day.IconPhrase}</p>
				</div>
			</div>
			<div class="day-back">
				<h4>Night</h4>
				<div class="layout-day-div">
					<img src="assets/svg/${day.DailyForecasts[0].Night.Icon}.svg" alt="icon">
					<p>${day.DailyForecasts[0].Night.IconPhrase}</p>
				</div>
			</div>
			<div class="day-back">
				<h4>Temperature</h4>
				<div class="layout-day-div">
					<p>Max: <span>${Math.floor((day.DailyForecasts[0].Temperature.Maximum.Value-32)*5/9)}</span>&deg;C</p>
					<p>Min: <span>${Math.floor((day.DailyForecasts[0].Temperature.Minimum.Value-32)*5/9)}</span>&deg;C</p>
				</div>
			</div>
		</div>
    `;

	//update icons
	const iconSrc = `assets/svg/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	//update night and day images
	let timeSrc = weather.IsDayTime ? 'assets/img/day.jpg' : 'assets/img/night.jpg';
	time.setAttribute('src', timeSrc);

	// remove the d-none class if present
	if (card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
};

const updateCity = async (city) => {
	// console.log(city);
	const cityDets = await getCity(city);
	const weather = await getWeather(cityDets.Key);
	const day = await getDayWeather(cityDets.Key);

	return { cityDets, weather, day };
};

cityForm.addEventListener('submit', (e) => {
	e.preventDefault();

	// get city value
	const city = cityForm.city.value.trim();
	cityForm.reset();

	//update the city for a new one
	updateCity(city).then((data) => updateUI(data)).catch((err) => console.log(err));

	//set local storage
	localStorage.setItem('city', city);

	anime({
		targets: '.anime-btn',
		backgroundColor: [
			{ value: "rgb(119, 192, 105)" },
			{ value: "#097970" }
		],
		duration: 1000,
		easing: 'easeInOutExpo'
	  });
	  
});

if (localStorage.getItem('city')) {
	updateCity(localStorage.getItem('city'))
		.then((data) => updateUI(data))
		.catch((err) => console.log(err));
}

// animations
anime({
	targets: '.container',
	keyframes: [
		{translateX: -350, opacity:0},
		{translateX: 0, opacity: 1},
	  ],
	duration: 1600,
	easing: 'easeInOutExpo'
  });