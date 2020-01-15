// Your code here
let createEmployeeRecord = (array) => {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // console.log(employee)
    return employee 
        
}

let createEmployeeRecords = (array) => {
    let employeeRecord = array.map(emArray => {
        return createEmployeeRecord(emArray);
    })
    // console.log(employeeRecord)
    return employeeRecord
}

let createTimeInEvent = (employeeRec, time) => {
    let splitTime = time.split(" ")
    employeeRec.timeInEvents.push({
        type: "TimeIn",
        date: splitTime[0],
        hour: parseInt(splitTime[1])
        
    })
    return employeeRec
}

let createTimeOutEvent = (employeeRec, time) => {
    let splitTime = time.split(" ")
    employeeRec.timeOutEvents.push({
        type: "TimeOut",
        date: splitTime[0],
        hour: parseInt(splitTime[1])
    })
    return employeeRec
}

let hoursWorkedOnDate = (employeeRec, date) => {
    let timeIn = employeeRec.timeInEvents.find(time => time.date === date)
    let timeOut = employeeRec.timeOutEvents.find(time => time.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = (employeeRec, date) => {
    let hours = hoursWorkedOnDate(employeeRec, date)
    return hours * employeeRec.payPerHour
}

let allWagesFor = (employeeRec)=>{
    let dates = employeeRec.timeInEvents.map(event => event.date)

    let pay = dates.reduce(function(accum, date){
        return accum + wagesEarnedOnDate(employeeRec, date)
    },0)
    return pay
}

let calculatePayroll = (emArray)=>{
    let payroll = emArray.reduce(function(accum, employee){
        return accum + allWagesFor(employee)
    }, 0)
    return payroll
}

let findEmployeeByFirstName = (ultr, name)=>{
    let employee = ultr.find(emp => emp.firstName === name)
    // console.log(employee)
    return employee
}