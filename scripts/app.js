const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
	//destruction properties
	const { cityDets, weather } = data;

	//update
	details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

	//update icons
	const iconSrc = `assets/svg/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	//update night and day images
	let timeSrc = weather.IsDayTime ? 'assets/img/day.svg' : 'assets/img/night.svg';
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

	return { cityDets, weather };
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
});

if (localStorage.getItem('city')) {
	updateCity(localStorage.getItem('city'))
		.then((data) => updateCity(data))
		.catch((err) => console.log(err));
}
