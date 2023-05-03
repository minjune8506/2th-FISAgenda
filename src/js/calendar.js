import { getWeatherImages } from './weather.js';

const SUNDAY = 0;
const SATURDAY = 6;
const NUMBER_OF_DAYS_OF_WEEK = 7;
const tbody = document.getElementsByTagName('tbody').item(0);

function getFirstDayOfMonth(year, monthIdx) {
	return new Date(year, monthIdx, 1).getDay();
}

function getLastDayOfMonth(year, monthIdx) {
	return new Date(year, monthIdx + 1, 0).getDay();
}

function getLastDateOfMonth(year, monthIdx) {
	return new Date(year, monthIdx + 1, 0).getDate();
}

function createDateElement(date, day, weatherImages) {
	const td = document.createElement('td');
	td.classList = ['table-border'];

	const topDiv = document.createElement('div');
	topDiv.classList = ['content-top'];

	const dateDiv = document.createElement('div');
	dateDiv.classList = ['text-xl, font-bold'];

	const label = document.createElement('div');
	label.classList = ['h-2/3'];

	if (day === SUNDAY) {
		dateDiv.classList.add('text-red-800');
	}
	if (day === SATURDAY) {
		dateDiv.classList.add('text-blue-800');
	}
	dateDiv.textContent = date;

	topDiv.appendChild(dateDiv);

	const weatherDiv = document.createElement('div');
	weatherDiv.classList = ['flex'];
	const today = new Date();
	const diff = date - today.getDate();
	if (diff < 5 && diff >= 0 && weatherImages) {
		const index = diff * 2;

		const morning = document.createElement('img');
		morning.src = `src/images/${weatherImages[index].white}`;
		morning.classList = ['mr-2']
		const night = document.createElement('img');
		night.src = `src/images/${weatherImages[index + 1].white}`;

		weatherDiv.appendChild(morning);
		weatherDiv.appendChild(night);
	}

	topDiv.appendChild(weatherDiv);
	td.appendChild(topDiv);
	td.appendChild(label);
	return td;
}

function createPrefix(year, monthIdx, weeks) {
	const firstDay = getFirstDayOfMonth(year, monthIdx);
	const pastMonthLastDate = getLastDateOfMonth(year, monthIdx - 1);
	const tr = document.createElement('tr');
	tr.classList = [`h-1/${weeks}`];

	tbody.appendChild(tr);
	for (let i = 0; i < firstDay; i += 1) {
		const date = pastMonthLastDate - (firstDay - i - 1);
		const day = new Date(year, monthIdx - 1, date).getDay();
		const el = createDateElement(date, day);
		tr.appendChild(el);
	}
}

function createSuffix(year, monthIdx, weeks) {
	const lastDay = getLastDayOfMonth(year, monthIdx);
	const tr = tbody.lastElementChild;
	tr.classList = [`h-1/${weeks}`];

	for (let i = 1; i <= 6 - lastDay; i += 1) {
		const day = new Date(year, monthIdx + 1, i).getDay();
		const el = createDateElement(i, day);
		tr.appendChild(el);
	}
}

function getWeeksInMonth(year, month) {
	// get the number of days in the month
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	// get the first day of the month
	const firstDayOfMonth = new Date(year, month, 1).getDay();

	// calculate the number of weeks
	const daysRemaining = daysInMonth - (7 - firstDayOfMonth);
	const numWeeks = Math.ceil(daysRemaining / 7) + 1;

	return numWeeks;
}

export default async function createCalendar(year, monthIdx) {
	const today = new Date();

	let weatherImages;
	if (today.getMonth() === monthIdx) {
		weatherImages = await getWeatherImages();
	}
	tbody.replaceChildren();

	const firstDay = getFirstDayOfMonth(year, monthIdx);
	const lastDay = getLastDayOfMonth(year, monthIdx);
	const lastDate = getLastDateOfMonth(year, monthIdx);
	const weeks = getWeeksInMonth(year, monthIdx);

	if (firstDay) {
		createPrefix(year, monthIdx, weeks);
	}

	let tr = tbody.firstElementChild ?? document.createElement('tr');

	for (let i = 1; i <= lastDate; i += 1) {
		if (!(tr.childElementCount % NUMBER_OF_DAYS_OF_WEEK)) {
			tr = document.createElement('tr');
			tr.classList = [`h-1/${weeks}`];
			tbody.appendChild(tr);
		}
		const day = new Date(year, monthIdx, i).getDay();
		const el = createDateElement(i, day, weatherImages);
		tr.appendChild(el);
	}

	if (lastDay !== SATURDAY) {
		createSuffix(year, monthIdx, weeks);
	}
}
