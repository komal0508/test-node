// const Attendance = require("../models/attendance");
// const Sequelize = require("sequelize");
// const sequelize = require('../config/db');
// const Op = Sequelize.Op;
// const moment = require('moment');

// module.exports = function(app) {
//  /**
//   * Post API which update the employee details.
//   */
//  app.post("/api/get-salary-by-empId", (req, res, next) => {
//     sequelize.query(`SELECT emp_id, SUM(time_mill) as total_milliseconds FROM public.attendances 
//     WHERE EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY emp_id HAVING emp_id IN
//     (SELECT emp_id FROM public.employees where factory_name = '${req.body.factoryName}')`, { type: sequelize.QueryTypes.SELECT })
//     .then((response) => {
//         console.log('Response is !', response);
//         if(response && response.length && response.length > 0) {
//             let obj = {};
//             let empArr = [];
//             for(let i = 0; i < response.length; i++) {
//                 console.log('moment(response[i].total_milliseconds)',parseInt(response[i].total_milliseconds));
//                 obj = {
//                     emp_id: response[i].emp_id,
//                     total_milliseconds: response[i].total_milliseconds, 
//                     total_time: moment.utc(parseInt(response[i].total_milliseconds)).format('HH:mm'),

//                 }
//                 console.log('obj is', obj);
//             empArr.push(obj);
//             }
//             console.log('****************');
            
//             const date =  moment().subtract(1, 'days').calendar();
//             console.log('no of days', date);
//             const days = parseInt(moment(date).daysInMonth());
//             const secondsInDay = days * 86400; //Convert days into seconds
//             console.log('days ', days, secondsInDay);
//             console.log('empArr', empArr);

//             //Shift_time store in seconds.. Suppose shift time is 8 hours then shift_time is 8 * 3600 = 28800...
//             sequelize.query(`Select emp_id, salary, category, shift_time, salary_value,  ${secondsInDay}* shift_time as total_time_of_month From public.employees where factory_name = '${req.body.factoryName}'`, { type: sequelize.QueryTypes.SELECT })
//             .then((result) => {
//                 console.log('result!!!!!', result);
//                 if (result && result.length && result.length > 0) {
//                     console.log('enter');
//                   let overtime = 0;
//                   let object = {};
//                   let salaryArray = [];
//                   let overtime_salary = 0;
//                   let oneHourSalary = 0;
//                   for (let i = 0; i < result.length; i++) {
//                    for(let j = 0; j < empArr.length; j++) {
//                     if(empArr[j].emp_id === result[i].emp_id) {
//                         overtime = (empArr[j].total_milliseconds - result[i].total_time_of_month) / 60; //Convert milliseconds into seconds
//                         if (overtime > 0) {
//                             oneHourSalary = (result[i].salary / secondsInDay) / result[i].shift_time; // One hour salary acc to seconds..
//                             if(result[i].category === 'random') {
//                                 overtime_salary = overtime * result[i].salary_value * oneHourSalary; 
//                             } else {
//                                 overtime_salary = overtime * result[i].salary_value; 
//                             }
//                          //Salary_value means how many times
//                         total_milliseconds = empArr[j].total_milliseconds;
//                         object = {
//                             emp_id: result[i].emp_id,
//                             total_milliseconds: total_milliseconds,
//                             overtime_salary: overtime_salary,
//                             salary: result[i].salary,
//                             //no_of_days: days,
//                             no_of_days: secondsInDay,
//                             oneHourSalary: oneHourSalary,
//                             overtime: overtime,
//                            }
//                            salaryArray.push(object);
//                         }
//                     }
//                    }
                  
                  
//                   }
//                   sequelize.query(`SELECT emp_id, SUM(time_mill) as office_work_milliseconds FROM public.office_works 
//                   WHERE is_accepted = true and EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY emp_id HAVING emp_id IN
//                   (SELECT emp_id FROM public.employees where factory_name = '${req.body.factoryName}')`, { type: sequelize.QueryTypes.SELECT })
//     .then((resp) => {
//         console.log('Response is !', resp);
//         if(resp && resp.length && resp.length > 0) {
//             let total_millisecond_for_salary = 0;
//             let total_salary = 0;
//             let salaryObject = {};
//             let finalSalaryArray = [];
//             for(let i = 0 ; i < resp.length; i++) {
//                 for(let j = 0; j < salaryArray.length; j++) {
//                     if(resp[i].emp_id === salaryArray[j].emp_id) {
//                         total_millisecond_for_salary = (salaryArray[j].total_milliseconds + resp[i].office_work_milliseconds) / 60;  //Convert milliseconds into seconds
//                         total_salary = total_millisecond_for_salary * salaryArray[j].oneHourSalary;
//                         salaryObject = {
//                             emp_id: salaryArray[j].emp_id,
//                             totalMilliseconds: salaryArray[j].total_milliseconds,
//                             overtimeSalary: salaryArray[j].overtime_salary,
//                             salary: salaryArray[j].salary,
//                             noOfDays: salaryArray[j].days,
//                             oneHourSalary: salaryArray[j].oneHourSalary,
//                             overTime: salaryArray[j].overtime,
//                             totalSalary: total_salary,
//                             totalSalaryMonth: parseInt(total_salary) + parseInt(salaryArray[j].overtime_salary) ,
//                         }
//                         finalSalaryArray.push(salaryObject);
//                     }
//                 }
//             }

//   console.log('fina;SalaryArray', finalSalaryArray);
//             res.statusCode = 200;
//                      res.send({
//                          status: 200,
//                          message: 'Month wise information fetched!!!',
//                          data: finalSalaryArray,
//                    });
//                    res.end();
//         } else {
//             res.statusCode = 201;
//             res.send({
//                 status: 201,
//                 message: 'Month wise information not fetched!!!',
//                // data: response,
//           });
//           res.end();
//         }
//     })
//     .catch((err) => {
//         console.log('err', err);
//         res.statusCode = 500;
//                res.send({
//                    status: 500,
//                    message: 'Oops!, Something went wrong with api'
//                });
//                res.end();
//     })

//                 }
//             })
//             .catch((error) => {
//                 res.statusCode = 203;
//             res.send({
//                 status: 203,
//                 message: 'shift_time not fetched!!!',
//                 data: response,
//           });
//           res.end();
//             });
//         } else {
//             res.statusCode = 201;
//             res.send({
//                 status: 201,
//                 message: 'Employee information not fetched!!!',
//                 data: response,
//           });
//           res.end();
//         }
//     })
//     .catch((err) => {
//         console.log('err', err);
//         res.statusCode = 500;
//                res.send({
//                    status: 500,
//                    message: 'Oops!, Something went wrong with api'
//                });
//                res.end();
//     })
//  });
// };



const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-salary", (req, res, next) => {
    sequelize.query(`SELECT A.emp_id, json_agg(DISTINCT salary ) as salary,json_agg(DISTINCT shift_time ) as shift_time,json_agg(DISTINCT category ) as category,
    json_agg(DISTINCT salary_value ) as salary_value, SUM(time_mill) as total_milliseconds,to_char(date, 'DD') as day_of_month FROM
    public.attendances as A, public.employees as E
     WHERE A.emp_id = E.emp_id and A.factory_name = '${req.body.factoryName}' and EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY A.emp_id, day_of_month;
     `, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        let finalSalary = {};
        if(response && response.length && response.length > 0) {
            let obj = {};
            let empArr = [];
            let finalSalary = {};
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
                    overtimeSalary = parseInt(response[i].salary_value[0]) * overtimeSeconds * oneSecondSalary;

                 }
                let totalSalary =  ((response[i].total_milliseconds / 1000) * oneSecondSalary) + overtimeSalary; // total salary of a employee of one day
                const employeeDetails = finalSalary[response[i].emp_id]; // check wheather employee is exist in final salary object 
                if(employeeDetails && employeeDetails !== undefined){ // is exist add data with previous one
                    const newTimeMilli = parseInt(employeeDetails.total_milliseconds) + parseInt(response[i].total_milliseconds);
                    const newOvertime = employeeDetails.overtimeSeconds + overtimeSeconds;
                    const newOverTimeSalary = employeeDetails.overtimeSalary + overtimeSalary;
                    const newTotalSalary = parseFloat(employeeDetails.totalSalary + totalSalary).toFixed(2);
                obj = {
                    total_milliseconds: newTimeMilli, 
                    overtimeSeconds: newOvertime,
                    overtimeSalary: newOverTimeSalary,
                    totalSalary: newTotalSalary,

                }
                } else { // if employee not exist
                obj = {
                    total_milliseconds: response[i].total_milliseconds, 
                    overtimeSeconds: overtimeSeconds,
                    overtimeSalary: overtimeSalary,
                    totalSalary: parseFloat(totalSalary).toFixed(2),
                }   
            }
             finalSalary[response[i].emp_id] = obj; // put all data into a final salary object
               
                console.log('obj is', obj);
            }   
        console.log(finalSalary, '***finalSal')         
          
            console.log('empArr', empArr);
            res.statusCode = 200;
            res.send({
            status: 200,
            message: 'Month wise information fetched!!!',
            data: finalSalary,
        });
            res.end();

          
        } else {
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Employee information not fetched!!!',
                data: response,
          });
          res.end();
        }
    })
    .catch((err) => {
        console.log('err', err);
        res.statusCode = 500;
               res.send({
                   status: 500,
                   message: 'Oops!, Something went wrong with api'
               });
               res.end();
    })
 });
};
