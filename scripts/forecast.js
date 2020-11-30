const key = 'gCIN2jodAm8AziDheZOEFQ5ogsVuiOhS';

//get weather info
const getWeather = async (id) => {
	const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};

const getDayWeather = async (id) => {
	const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
	const query = `${id}?apikey=${key}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data;
};

// get city info
const getCity = async (city) => {
	const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
	const query = `?apikey=${key}&q=${city}`;

	const response = await fetch(base + query);
	const data = await response.json();

	return data[0];
};
