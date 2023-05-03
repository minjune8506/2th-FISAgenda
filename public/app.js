const options = (method, headers, body) => {
    return {method, headers, body: JSON.stringify(body)}
}

const saveSchedule = async(startDate, endDate, content) => {
    const url = '/save';
    const op1 = options('POST', {'Content-Type': 'application/json'}, {scheduleId: 1, startDate: startDate, endDate: endDate, content: content})

    await fetch(url, op1)
    .then(r => r.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.error(err));
}

const getSchedules = async() => {
    const url = '/schedule'
    await fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.error(err));
}

const deleteSchedule = async() => {
    const url = '/remove'
    await fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.error(err));
}