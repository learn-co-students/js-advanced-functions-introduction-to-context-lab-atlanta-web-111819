function createEmployeeRecord(dataArray) {
    return {
        firstName: dataArray[0],
        familyName: dataArray[1],
        title: dataArray[2],
        payPerHour: dataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employeeRecord, time) {
    const dateTimePieces = time.split(" ")

    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        date: dateTimePieces[0],
        hour: parseInt(dateTimePieces[1])
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, time) {
    const dateTimePieces = time.split(' ')

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        date: dateTimePieces[0],
        hour: parseInt(dateTimePieces[1])
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInIndex = employeeRecord.timeInEvents.findIndex(element => element.date === date)
    const timeOutIndex = employeeRecord.timeOutEvents.findIndex(element => element.date === date)

    return (employeeRecord.timeOutEvents[timeOutIndex].hour - employeeRecord.timeInEvents[timeInIndex].hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeOutEvents.reduce((memo, current) => memo += wagesEarnedOnDate(employeeRecord, current.date), 0)
}

function calculatePayroll(employees) {
    return employees.reduce((agg, employee) => agg + allWagesFor(employee), 0)
}

function findEmployeeByFirstName(data, name) {
    return data.find(record => record.firstName === name)
}