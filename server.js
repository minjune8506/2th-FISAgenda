const express = require('express');
const cors = require('cors')
const axios = require('axios');
require('dotenv').config();

const CITY_NAME = 'Seoul';
const { APP_ID } = process.env;
const MORNING = 6;
const NIGHT = 18;

const app = express();
const port = 3000;

app.use(cors());
app.use('/src', express.static(`${__dirname}/src`));

app.get('/weather', async (req, res, next) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${APP_ID}&lang=kr`;
	try {
		const data = await axios.get(url);
		const { list } = data.data;
		const weathers = list
			.filter((l) => {
				const date = new Date(l.dt_txt);
				if (date.getHours() === MORNING || date.getHours() === NIGHT) {
					return true;
				}
				return false;
			})
			.map((m) => ({
				id: m.weather[0].id,
				description: m.weather[0].main,
			}));
		res.json(weathers); // send response
	} catch (err) {
		next(err.message);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
