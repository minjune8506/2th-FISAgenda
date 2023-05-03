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
	{
		edu: 'seminar',
		deatil: '기술세미나',
		start: new Date(2023, 4, 24),
		end: new Date(2023, 4, 25),
	},
	{
		edu: 'back',
		deatil: '프로그래밍',
		start: new Date(2023, 4, 26),
		end: new Date(2023, 5, 8),
	},
	{
		edu: 'back',
		deatil: '데이터베이스',
		start: new Date(2023, 5, 9),
		end: new Date(2023, 5, 21),
	},
	{
		edu: 'back',
		deatil: '프레임워크',
		start: new Date(2023, 5, 22),
		end: new Date(2023, 6, 10),
	},
	{
		edu: 'back',
		deatil: '핀테크 OpenAPI',
		start: new Date(2023, 6, 11),
		end: new Date(2023, 6, 14),
	},
	{
		edu: 'seminar',
		deatil: '기술세미나',
		start: new Date(2023, 6, 17),
		end: new Date(2023, 6, 18),
	},
	{
		edu: 'cloud',
		deatil: '클라우드 네이티브',
		start: new Date(2023, 6, 19),
		end: new Date(2023, 6, 19),
	},
	{
		edu: 'cloud',
		deatil: '리눅스',
		start: new Date(2023, 6, 20),
		end: new Date(2023, 6, 21),
	},
];
export const getLabel = (day) => {
	const result = [];
	let title = `&nbsp;`;
	curriculum.forEach((v) => {
		if (v.start <= day && v.end >= day) {
			console.log('1', v);
			let className = `${v.edu} label`;
			if (day.getDate() === v.start.getDate()) {
				className = `start ${className}`;
				title = v.deatil;
			}
			if (day.getDate() === v.end.getDate()) {
				title = v.deatil;
				className = `end ${className}`;
			}
			result.push([title, className]);
		}
	});
	return result;
};
