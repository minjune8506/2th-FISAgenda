import createCalendar from '../components/calendar.js';

const MONTHS = [
	'Janyary',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const YEAR = 2023;

const today = new Date();
let month = today.getMonth() < 4 || today.getMonth() > 8 ? 4 : today.getMonth();
const nextBtn = document.getElementById('nextButton');
const prevBtn = document.getElementById('prevButton');
const monthSelect = document.getElementById('month-select');

const monthChange = () => {
	month = MONTHS.indexOf(monthSelect.value);
	createCalendar(YEAR, month);
};
const addMonth = () => {
	month += 1;
	nextBtn.disabled = false;
	prevBtn.disabled = false;
	if (month > 8) {
		month = 8;
		nextBtn.disabled = true;
	}
	monthSelect.value = MONTHS[month];
	createCalendar(YEAR, month);
};
const subMonth = () => {
	month -= 1;
	nextBtn.disabled = false;
	prevBtn.disabled = false;
	if (month < 4) {
		month = 4;
		prevBtn.disabled = true;
	}
	createCalendar(YEAR, month);
	monthSelect.value = MONTHS[month];
};
// event
nextBtn.addEventListener('click', addMonth);

prevBtn.addEventListener('click', subMonth);

monthSelect.addEventListener('change', monthChange);

// 현재 달을 기준으로 변경
monthChange();
