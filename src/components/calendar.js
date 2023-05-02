import { date } from "../date.js";
export default function calendar({ target }) {
  const calendar = document.createElement("div");
  const caledarTable = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  let month = 5;

  calendar.setAttribute("class", "calendar");

  thead.innerHTML = `
    <tr>
        <th>Sunday</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
    </tr>
  `;

  // 일단 5월만
  for (let i = 0; i < date[month].length; i += 7) {
    tbody.innerHTML += `
    <tr>
    ${date[month]
      .slice(i, i + 7)
      .map((v) => {
        return `
        <td>${v}</td>
        `;
      })
      .join("")}
    </tr>`;
  }

  caledarTable.appendChild(thead);
  caledarTable.appendChild(tbody);
  calendar.appendChild(caledarTable);
  target.appendChild(calendar);
}
