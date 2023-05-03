const baseUrl = 'http://localhost:3000';

const weatherMap = new Map();
weatherMap.set('Thunderstorm', {
	dark: 'thunderstorm-dark.png',
	white: 'thunderstorm-white',
});
weatherMap.set('Drizzle', {
	dark: 'drizzle-dark.svg',
	white: 'drizzle-white.svg',
});
weatherMap.set('Rain', { dark: 'rain-dark.png', white: 'rain-white.png' });
weatherMap.set('Snow', { dark: 'snow-dark.png', white: 'snow-white.png' });
weatherMap.set('Atmosphere', {
	dark: 'atmosphere-dark.png',
	white: 'atmosphere-white.png',
});
weatherMap.set('Clear', { dark: 'clear-dark.svg', white: 'clear-white.png' });
weatherMap.set('Clouds', {
	dark: 'clouds-dark.png',
	white: 'clouds-white.png',
});

async function getWeather() {
	const data = await fetch(`${baseUrl}/weather`);
	const json = data.json();
	return json;
}

async function convertToImg() {
	const data = await getWeather();
	return data.map((m) => weatherMap.get(m.description));
}

const body = document.getElementsByTagName('body').item(0);
convertToImg().then((res) => {
	res.forEach((item) => {
		const imgDark = document.createElement('img');
		imgDark.src = `/public/images/${item.dark}`;
		const imgWhite = document.createElement('img');
		imgWhite.src = `/public/images/${item.white}`;
		body.appendChild(imgDark);
		body.appendChild(imgWhite);
	});
});
