const options = (method, headers, body) => {
    return {method, headers, body: JSON.stringify(body)}
}

export const saveSchedule = async(scheduleId, startDate, endDate, edu, detail) => {
    const url = 'http://127.0.0.1:3000/save';
    const op1 = options('POST', {'Content-Type': 'application/json'}, {scheduleId: scheduleId, startDate: startDate, endDate: endDate, edu: edu, detail: detail})
    console.log(op1);
    await fetch(url, op1)
    .then(r => r.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.error(err));
}

export const getSchedules = async() => {
    const url = 'http://127.0.0.1:3000/schedule'
    const res = await fetch(url);
    return res.json()

    // .then(r => r.json())
    // .then(data => {
        
    // }).catch(err => console.error(err));
}

const deleteSchedule = async() => {
    const url = '/remove'
    await fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data);
    }).catch(err => console.error(err));
}