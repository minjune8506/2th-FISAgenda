import { getSchedules } from "./app.js";
const curriculum = await getSchedules();
console.log(curriculum);

export const getLabel = (day) => {
	const result = [];
	let title = `&nbsp;`;
	curriculum.forEach((v) => {
		// console.log(v);
		const sDate = new Date(v.startDate);
		const eDate = new Date(v.endDate);

		if (sDate <= day && eDate >= day) {
			// console.log('1', v);
			let className = `${v.edu} label`;
			if (day.getDate() === sDate.getDate()) {
				className = `start ${className}`;
				title = v.detail;
			}
			if (day.getDate() === eDate.getDate()) {
				title = v.detail;
				className = `end ${className}`;
			}
			result.push([title, className]);
		}
	});
	return result;
};
