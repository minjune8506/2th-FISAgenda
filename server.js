const express = require("express");
const axios = require("axios");
const fb = require('firebase/database')
const admin = require('firebase/app')
const db= require('./config.js');
const cors = require('cors')
const database = admin.initializeApp(db)

const realTimeDatabase = fb.getDatabase(database)
require("dotenv").config();

const CITY_NAME = 'Seoul';
const { WEATHER_APP_ID } = process.env;
const MORNING = 6;
const NIGHT = 18;

const app = express();
const port = 3000;

app.use(cors());

app.get('/weather', async (req, res, next) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${WEATHER_APP_ID}&lang=kr`;
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
		console.error(err);
		next(err.message);
	}
});

app.get('/schedule', function(req, res){
	const dbRef = fb.ref(realTimeDatabase)
	// `schedule/${req.query.id}`
	fb.get(fb.child(dbRef, 'schedule/')).then((snapshot) => {
		if (snapshot.exists()){
			return res.json(snapshot.val())
		} else {
			console.log("No data available");
			return res.json({})
		}
	}).catch((err)=>console.log(err))
});

app.post('/save', function(req, res){

	fb.set(fb.ref(realTimeDatabase, 'schedule/' + req.body.scheduleId), {
		startDate: req.body.startDate,
		endDate: req.body.endDate,
		content: req.body.content
	})
	return res.json({id: req.body.scheduleId})
})

app.get('/remove', function(req, res){
	fb.remove(fb.ref(realTimeDatabase, `schedule/${req.query.id}`))
	return res.json({id: req.query.id})
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
