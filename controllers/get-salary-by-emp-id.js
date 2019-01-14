const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-salary-by-empId", (req, res, next) => {
    sequelize.query(`SELECT A.emp_id, json_agg(A.punch_out ) as punch_out, json_agg(A.punch_in ) as punch_in,  json_agg(DISTINCT salary ) as salary,json_agg(DISTINCT shift_time ) as shift_time,json_agg(DISTINCT category ) as category,
    json_agg(DISTINCT salary_value ) as salary_value, SUM(time_mill) as total_milliseconds,to_char(date, 'DD') as day_of_month FROM
    public.attendances as A, public.employees as E
     WHERE A.emp_id = '${req.body.empId}'and E.emp_id = '${req.body.empId}' and A.factory_name = '${req.body.factoryName}' and EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY A.emp_id, day_of_month;
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
                 let punchArray = []
                 const punchInValue = moment(response[i].punch_in);
                 const punchOutValue = moment(response[i].punch_out);
                
                 
                let totalSalary =  ((response[i].total_milliseconds / 1000) * oneSecondSalary) + overtimeSalary; // total salary of a employee of one day
                const employeeDetails = finalSalary[response[i].emp_id]; // check wheather employee is exist in final salary object 
                if(employeeDetails && employeeDetails !== undefined){ // is exist add data with previous one
                    const newTimeMilli = parseInt(employeeDetails.total_milliseconds) + parseInt(response[i].total_milliseconds);
                    const newOvertime = employeeDetails.overtimeSeconds + overtimeSeconds;
                    const newOverTimeSalary = employeeDetails.overtimeSalary + overtimeSalary;
                    const newTotalSalary = parseFloat(employeeDetails.totalSalary + totalSalary).toFixed(2);
                    punchObj = {
                        punch_in: punchInValue,
                        punch_out: punchOutValue,
                    }
                    const previousArray = employeeDetails.punchArray;
                    const newPunchArray = previousArray.concat(punchObj)
                    punchArray.push(newPunchArray);
                obj = {
                    total_milliseconds: newTimeMilli, 
                    overtimeSeconds: newOvertime,
                    overtimeSalary: newOverTimeSalary,
                    totalSalary: newTotalSalary,
                    punchArray: newPunchArray,

                }
                } else { // if employee not exist
                    punchObj = {
                        punch_in: punchInValue,
                        punch_out: punchOutValue,
                    }
                    punchArray.push(punchObj);
                obj = {
                    total_milliseconds: response[i].total_milliseconds, 
                    overtimeSeconds: overtimeSeconds,
                    overtimeSalary: overtimeSalary,

                    totalSalary: parseFloat(totalSalary).toFixed(2),
                    punchArray: punchArray,
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