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
    sequelize.query(`SELECT emp_id, SUM(time_mill) as total_milliseconds FROM public.attendances 
    WHERE EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY emp_id HAVING emp_id IN
    (SELECT emp_id FROM public.employees where factory_name = '${req.body.factoryName}')`, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        if(response && response.length && response.length > 0) {
            let obj = {};
            let empArr = [];
            for(let i = 0; i < response.length; i++) {
                console.log('moment(response[i].total_milliseconds)',parseInt(response[i].total_milliseconds));
                obj = {
                    emp_id: response[i].emp_id,
                    total_milliseconds: response[i].total_milliseconds,
                    total_time: moment.utc(parseInt(response[i].total_milliseconds)).format('HH:mm'),

                }
                console.log('obj is', obj);
            empArr.push(obj);
            }
            console.log('****************');
            
            const date =  moment().subtract(1, 'month').calendar();
            console.log('no of days', date);
            const days = parseInt(moment(date).daysInMonth());
            console.log('days ', days);
            console.log('empArr', empArr);
            sequelize.query(`Select emp_id, salary, category, shift_time, salary_value,  ${days}* shift_time as total_time_of_month From public.employees where factory_name = '${req.body.factoryName}'`, { type: sequelize.QueryTypes.SELECT })
            .then((result) => {
                console.log('result!!!!!', result);
                if (result && result.length && result.length > 0) {
                    console.log('enter');
                  let overtime = 0;
                  let object = {};
                  let salaryArray = [];
                  let overtime_salary = 0;
                  let oneHourSalary = 0;
                  for (let i = 0; i < result.length; i++) {
                   for(let j = 0; j < empArr.length; j++) {
                    if(empArr[j].emp_id === result[i].emp_id) {
                        overtime = result[i].total_time_of_month - empArr[j].total_milliseconds;
                        oneHourSalary = (result[i].salary / days) / result[i].shift_time;
                        overtime_salary = overtime * result[i].salary_value * oneHourSalary;
                        total_milliseconds = empArr[j].total_milliseconds;
                        object = {
                            emp_id: result[i].emp_id,
                            total_milliseconds: total_milliseconds,
                            overtime_salary: overtime_salary,
                            salary: result[i].salary,
                            no_of_days: days,
                            oneHourSalary: oneHourSalary,
                            overtime: overtime,
                           }
                           salaryArray.push(object);
                    }
                   }
                  
                  
                  }
                  sequelize.query(`SELECT emp_id, SUM(time_mill) as office_work_milliseconds FROM public.office_works 
                  WHERE is_accepted = true and EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY emp_id HAVING emp_id IN
                  (SELECT emp_id FROM public.employees where factory_name = '${req.body.factoryName}')`, { type: sequelize.QueryTypes.SELECT })
    .then((resp) => {
        console.log('Response is !', resp);
        if(resp && resp.length && resp.length > 0) {
            let total_millisecond_for_salary = 0;
            let total_salary = 0;
            let salaryObject = {};
            let finalSalaryArray = [];
            for(let i = 0 ; i < resp.length; i++) {
                for(let j = 0; j < salaryArray.length; j++) {
                    if(resp[i].emp_id === salaryArray[j].emp_id) {
                        total_millisecond_for_salary = salaryArray[j].total_milliseconds + resp[i].office_work_milliseconds;
                        total_salary = total_millisecond_for_salary * salaryArray[j].oneHourSalary;
                        salaryObject = {
                            emp_id: salaryArray[j].emp_id,
                            totalMilliseconds: salaryArray[j].total_milliseconds,
                            overtimeSalary: salaryArray[j].overtime_salary,
                            salary: salaryArray[j].salary,
                            noOfDays: salaryArray[j].days,
                            oneHourSalary: salaryArray[j].oneHourSalary,
                            overTime: salaryArray[j].overtime,
                            totalSalary: total_salary,
                            totalSalaryMonth: parseInt(total_salary) + parseInt(salaryArray[j].overtime_salary) ,
                        }
                        finalSalaryArray.push(salaryObject);
                    }
                }
            }

  console.log('fina;SalaryArray', finalSalaryArray);
            res.statusCode = 200;
                     res.send({
                         status: 200,
                         message: 'Month wise information fetched!!!',
                         data: finalSalaryArray,
                   });
                   res.end();
        } else {
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Month wise information not fetched!!!',
               // data: response,
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

                }
            })
            .catch((error) => {
                res.statusCode = 203;
            res.send({
                status: 203,
                message: 'shift_time not fetched!!!',
                data: response,
          });
          res.end();
            });
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