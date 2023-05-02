const express = require("express");
const axios = require("axios");
require("dotenv").config();

const COUNT = 16;
const CITY_NAME = "Seoul";
const APP_ID = process.env.APP_ID;

const app = express();
const port = 3000;

app.use("/static", express.static(__dirname + "/public"));

app.get("/weather", async (req, res, next) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${APP_ID}`;
	try {
		const data = await axios.get(url);
		console.log(data.data.list);
		console.log(data.data.list.length);
		res.json(data.data.list); // send response
	} catch (err) {
		next(err.message);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
