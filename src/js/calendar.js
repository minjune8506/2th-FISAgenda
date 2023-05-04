import { getWeatherImages } from './weather.js';
import { getLabel } from './calendarLabel.js';

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

function createDateDiv(date, day) {
	const dateDiv = document.createElement('div');
	dateDiv.classList.add('ml-2');
	dateDiv.classList.add('text-2xl');

	if (day === SUNDAY) {
		dateDiv.classList.add('text-red-800');
	}
	if (day === SATURDAY) {
		dateDiv.classList.add('text-blue-800');
	}
	dateDiv.textContent = date;

	return dateDiv;
}

function createWeatherDiv(date, weatherImages) {
	const weatherDiv = document.createElement('div');
	weatherDiv.classList = ['flex'];

	const today = new Date();
	const diff = date - today.getDate();
	if (diff < 5 && diff >= 0 && weatherImages) {
		const index = diff * 2;

		const morning = document.createElement('img');
		morning.src = `src/images/${weatherImages[index].white}`;
		morning.classList = ['mr-2'];
		const night = document.createElement('img');
		night.src = `src/images/${weatherImages[index + 1].white}`;
		night.classList = ['mr-2'];

		weatherDiv.appendChild(morning);
		weatherDiv.appendChild(night);
	}
	return weatherDiv;
}

function createTopDiv(date, day, weatherImages) {
	const topDiv = document.createElement('div');
	topDiv.classList = ['content-top'];

	// add date
	topDiv.appendChild(createDateDiv(date, day));

	// add weather
	topDiv.appendChild(createWeatherDiv(date, weatherImages));

	return topDiv;
}

function createLabels(labels) {
	const labelDivs = labels.map((v) => {
		const label = document.createElement('div');
		label.innerHTML = `
		  <div class='${v[1]}'><p>${v[0]}</p></div>
		  `;
		return label;
	});
	return labelDivs;
}

function createDateElement(date, day, weatherImages, labels = []) {
	const td = document.createElement('td');
	td.classList.add('table-border');

	const tdDiv = document.createElement('div');
	tdDiv.style.width = '100%';
	tdDiv.style.height = '100%';
	td.appendChild(tdDiv);

	const topDiv = createTopDiv(date, day, weatherImages);
	tdDiv.appendChild(topDiv);

	const content = document.createElement('div');
	content.classList.add('h-2/3');
	content.classList.add('label-container');
	content.classList.add('flex');
	content.classList.add('flex-col');
	content.classList.add('gap-1');
	tdDiv.appendChild(content);

	// add label
	createLabels(labels).forEach((label) => content.appendChild(label));

	return td;
}

function createPrefix(year, monthIdx, weeks) {
	const firstDay = getFirstDayOfMonth(year, monthIdx);
	const pastMonthLastDate = getLastDateOfMonth(year, monthIdx - 1);
	const tr = document.createElement('tr');
	tr.classList.add(`h-auto`);

	tbody.appendChild(tr);

	for (let i = 0; i < firstDay; i += 1) {
		const date = pastMonthLastDate - (firstDay - i - 1);
		const day = new Date(year, monthIdx - 1, date);
		const el = createDateElement(
			day.getDate(),
			day.getDay(),
			null,
			getLabel(day),
		);
		el.classList.add('bg-gray-200');
		el.classList.add('opacity-30');
		tr.appendChild(el);
	}
}

function createSuffix(year, monthIdx, weeks) {
	const lastDay = getLastDayOfMonth(year, monthIdx);
	const tr = tbody.lastElementChild;
	tr.classList = [`h-auto`];

	for (let i = 1; i <= 6 - lastDay; i += 1) {
		const day = new Date(year, monthIdx + 1, i);
		const el = createDateElement(i, day.getDay(), null, getLabel(day));
		el.classList.add('bg-gray-200');
		el.classList.add('opacity-30');
		tr.appendChild(el);
	}
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
		const date = new Date(year, monthIdx, i);

		const labels = await getLabel(date);

		if (!(tr.childElementCount % NUMBER_OF_DAYS_OF_WEEK)) {
			tr = document.createElement('tr');
			tr.classList.add(`h-auto`);
			tbody.appendChild(tr);
		}

		const day = new Date(year, monthIdx, i).getDay();
		const el = createDateElement(i, day, weatherImages, labels);
		if (monthIdx === today.getMonth() && i === today.getDate())
			el.classList.add('today');
		tr.appendChild(el);
	}

	if (lastDay !== SATURDAY) {
		createSuffix(year, monthIdx, weeks);
	}
}
