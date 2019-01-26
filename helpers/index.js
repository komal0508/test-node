const sequelize = require('../config/db');
const moment = require('moment');
const OfficeWork = require("../models/office_work");
const Salary = require('../models/salary');
const EmpSalDetails = require('../models/emp_sal_detail');
const async = require('async');
const findOfficeWorkData = (attendanceIdArray,punchInArray, punchOutArray) => {
    return  new Promise((resolve, reject) => {

        let iteration = 0;
        let promises = [];
        for (var i = 0; i < attendanceIdArray.length; i++) {
            OfficeWork.findOne({
                where: {
                    attendence_id: attendanceIdArray[i],
                },
            })
            .then((result) => {
                let data ;
                if(result) {
                    

                    data = {
                             punch_in: moment(punchInArray[i]),
                             punch_out: moment(punchOutArray[i]),
                             is_office_work: true,
                             comment: result.comment,
                             purpose: result.purpose,
                             is_accepted: result.is_accepted,
                            }
                        promises.push(data)
                        iteration = iteration + 1;

                         if(iteration === attendanceIdArray.length){
                             resolve(promises);
                         }
                    
                } else {
                    data = {
                        punch_in: moment(punchInArray[i]),
                         punch_out: moment(punchOutArray[i]),
                 }
                 promises.push(data)
                 iteration = iteration + 1;
                 console.log(iteration, attendanceIdArray.length, '***length12')
                 if(iteration === attendanceIdArray.length){
                     console.log('inside for')
                    resolve(promises);
                }
                }
              
                console.log(promises, '************promises')
                   
            })
            .catch((error) => {
                console.log('Error', error);
            });   
        };
    })

}





const calculateSalary = (response, req) => {
    return new Promise((resolve, reject) => {
        let obj = {};
        let finalSalary = {};
        let noOfIteration = 0;
        for(let i = 0; i < response.length; i++) {
           
            const shiftTimeMilli = parseInt(response[i].shift_time[0]) * 3600000; // convert shift time into milliseconds
            let overtimeSeconds =  (parseInt(response[i].total_milliseconds) - shiftTimeMilli) / 1000; // total overtime seconds of a day
             if(overtimeSeconds > 0 ){ //if overtime is there or not  
                overtimeSeconds = overtimeSeconds
            } else {
                overtimeSeconds = 0
            }
            const noOfDaysInMonth = moment(`${req.body.year}-${req.body.month}`, "YYYY-MM").daysInMonth(); // find days in that month
            const oneSecondSalary = response[i].salary[0] / (noOfDaysInMonth * response[i].shift_time[0] * 3600); // one second salary of a employee
           
             let overtimeSalary = 0;
             if(response[i].category[0] === 'fixed'){
                 overtimeSalary = (overtimeSeconds / 3600 ) * parseInt(response[i].salary_value[0]);
             } else {
                 console.log('***over', overtimeSeconds,oneSecondSalary, parseFloat(response[i].salary_value[0]))
                overtimeSalary = parseFloat(response[i].salary_value[0]) * overtimeSeconds * oneSecondSalary;

             }
             let punchArray = []
             let punchArrayOfSameDay = [];
             const punchInArray = response[i].punch_in;
             const punchOutArray = response[i].punch_out;
             const attendanceIdArray = response[i].attendence_id;
             const officeWorkArray = response[i].is_office_work;
             let punchDataWithOfficeWorkArray = [];
             console.log('*******overtimeSal', overtimeSalary)
            

                 findOfficeWorkData(attendanceIdArray, punchInArray, punchOutArray).then((finalRes, re) => {
                    console.log('*************Sec')
                    console.log('finalRes', finalRes,re)
                    if(finalRes){
                        noOfIteration = noOfIteration + 1;
                        punchDataWithOfficeWorkArray = finalRes;
                        let totalSalary =  (((response[i].total_milliseconds / 1000) - overtimeSeconds) * oneSecondSalary) + overtimeSalary; // total salary of a employee of one day
                        console.log(totalSalary, '*****totalSal');
                        const employeeDetails = finalSalary[response[i].emp_id]; // check wheather employee is exist in final salary object 
                        if(employeeDetails && employeeDetails !== undefined){ // is exist add data with previous one
                            const newTimeMilli = (parseInt(employeeDetails.total_seconds) + (parseInt(response[i].total_milliseconds) / 1000));
                            const newOvertime = employeeDetails.overtimeSeconds + overtimeSeconds;
                            const newOverTimeSalary = employeeDetails.overtimeSalary + overtimeSalary;
                            const newTotalSalary = parseFloat(parseInt(employeeDetails.totalSalary) + totalSalary).toFixed(2);
                            const previousArray = employeeDetails.punchArray;
                            const newPunchArray = previousArray.concat(punchDataWithOfficeWorkArray)
                        obj = {
                            total_seconds: newTimeMilli, // convert into seconds 
                            overtimeSeconds: newOvertime,
                            overtimeSalary: parseFloat(newOverTimeSalary).toFixed(2),
                            totalSalary: newTotalSalary,
                            punchArray: newPunchArray,
        
                        }
                        } else { // if employee not exist
                            
                        obj = {
                            total_seconds: parseInt(response[i].total_milliseconds) / 1000,  // convert into seconds
                            overtimeSeconds: overtimeSeconds,
                            overtimeSalary: parseFloat(overtimeSalary).toFixed(2),
        
                            totalSalary: parseFloat(totalSalary).toFixed(2),
                            punchArray: punchDataWithOfficeWorkArray,
                        }   
                    }
                    console.log('*************first')
                     finalSalary[response[i].emp_id] = obj; 
                       
                        console.log('obj is', obj);
                        console.log(finalSalary, '***finalSal2112') 
                        if(response.length === noOfIteration){
                            resolve(finalSalary)
                        }
                      
                        

                    }
                       
                       
                 });  
           
        } 
    })
}






saveSalaryOfEmployee = (id, salary, month, year) =>{
    return new Promise((resolve, reject) => {

    Salary.findOne({
        where: {
         emp_id: id,
         month: month,
         year: year,
        }
    }).then((user) => {
        if (user) {
            console.log('emp salary already stored');
            resolve({ status: 200 })
        } else {
            Salary.create({
                emp_id: id,
                month: month,
                year: year,
                salary: salary,
       })
         .then(salaryUser => {
           console.log("salary stored successfully!!!");
           if (salaryUser) {
              resolve({ status: 200 })
           }
         })
         .catch(err => {
            reject(err)
         });
        }
    }).catch((err) => {
        res.statusCode = 500;
        res.send({
            status: 500,
            message: 'Oops!, Something went wrong with api'
        });
        res.end();
    })
})
}





saveEmpSalDetails = (empId, month, year, details) =>{
    return new Promise((resolve, reject) => {
        const empData = details[empId];
        console.log(empData, '****empData')
     EmpSalDetails.findOne({
        where: {
         emp_id: empId,
         month: month,
         year: year,
        }
    }).then((user) => {
        if (user) {
            console.log('emp salary already stored');
            resolve({ status: 200 })
        } else {
            EmpSalDetails.create({
                emp_id: empId,
                month: month,
                year: year,
                overtime_seconds: empData.overtimeSeconds,
                overtime_salary: parseFloat(empData.overtimeSalary),
                total_seconds: empData.total_seconds,
                total_salary: parseFloat(empData.totalSalary),
                punch_array: empData.punchArray,

       })
         .then(salaryUser => {
           console.log(" emp salary stored successfully!!!");
           if (salaryUser) {
              resolve({ status: 200 })
           }
         })
         .catch(err => {
            reject(err)
         });
        }
    }).catch((err) => {
       console.log(err, '****err')
    })
})
}

module.exports.calculateSalary = calculateSalary;
module.exports.findOfficeWorkData = findOfficeWorkData;
module.exports.saveSalaryOfEmployee = saveSalaryOfEmployee;
module.exports.saveEmpSalDetails = saveEmpSalDetails;