const MONTHS = [
  "Janyary",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const YEAR = 2023;

const today = new Date();
let month = today.getMonth() < 4 || today.getMonth() > 8 ? 4 : today.getMonth();
const tbody = document.getElementById("calendar-body");
const tr = document.querySelectorAll("tr");
const calendarDay = document.getElementsByClassName("days");
const nextBtn = document.getElementById("nextButton");
const prevBtn = document.getElementById("prevButton");
const monthSelect = document.getElementById("month-select");

const monthChange = () => {
  month = MONTHS.indexOf(monthSelect.value);
  getCalendarItem();
};

const getDays = () => {
  const firstDay = new Date(YEAR, month);
  const lastDay = new Date(YEAR, month + 1, 0);

  return [
    firstDay.getDay(),
    [...new Array(lastDay.getDate()).fill(0).map((_, i) => i + 1)],
  ];
};

const calendarRender = (days) => {
  for (let i = 0; i < calendarDay.length; i++) {
    calendarDay[i].innerHTML = days[i];
  }
  monthSelect.value = MONTHS[month];
};

const getCalendarItem = () => {
  const [startWeek, days] = getDays();
  if (startWeek !== 0) {
    let prevLastDay = new Date(YEAR, month, 0).getDate();
    for (let i = startWeek; i > 0; i--) {
      days.unshift(prevLastDay--);
    }
  }

  let nextDay = 1;
  while (days.length % 7 !== 0) {
    days.push(nextDay++);
  }
  calendarRender(days);
};

// event
nextBtn.addEventListener("click", () => {
  month += 1;
  if (month > 8) month = 8;
  getCalendarItem();
});

prevBtn.addEventListener("click", () => {
  month -= 1;
  if (month < 4) month = 4;
  getCalendarItem();
});

monthSelect.addEventListener("change", monthChange);

// 현재 달을 기준으로 변경
monthChange();
