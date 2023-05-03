const curriculum = [
	{
		edu: 'front',
		deatil: '프로그래밍',
		start: new Date(2023, 3, 24),
		end: new Date(2023, 4, 9),
	},
	{
		edu: 'front',
		deatil: '프레임워크',
		start: new Date(2023, 4, 10),
		end: new Date(2023, 4, 23),
	},
];

export const getLabel = (day) => {
	const result = [];
	curriculum.forEach((v) => {
		if (v.start <= day && v.end >= day) {
			console.log('1', v);
			let className = `${v.edu}-label`;
			if (day.getDate() === v.start.getDate())
				className = `start-${className}`;
			else if (day.getDate() === v.end.getDate())
				className = `end-${className}`;

			result.push([v.deatil, className]);
		}
	});
	return result;
};
