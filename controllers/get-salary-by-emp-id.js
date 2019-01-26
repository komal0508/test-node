const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const Op = Sequelize.Op;
const helper = require('../helpers/index')
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-salary-by-empId", (req, res, next) => {
    sequelize.query(`SELECT A.emp_id, array_agg(A.is_office_work) as is_office_work, array_agg(A.id) as attendence_id,array_agg(A.punch_out) as punch_in, array_agg(A.punch_in) as punch_out,  json_agg(DISTINCT salary ) as salary,json_agg(DISTINCT shift_time ) as shift_time,json_agg(DISTINCT category ) as category,
    json_agg(DISTINCT salary_value ) as salary_value, SUM(time_mill) as total_milliseconds,to_char(date, 'DD') as day_of_month FROM
    public.attendances as A, public.employees as E
     WHERE A.emp_id = '${req.body.empId}'and E.emp_id = '${req.body.empId}' and A.factory_name = '${req.body.factoryName}' and EXTRACT(month FROM date) = ${req.body.month} and EXTRACT(YEAR FROM date) = ${req.body.year} GROUP BY A.emp_id, day_of_month;
     `, { type: sequelize.QueryTypes.SELECT })
    .then((response) => {
        console.log('Response is !', response);
        let finalSalary = {};
        if(response && response.length && response.length > 0) {
            helper.calculateSalary(response, req).then((resSalary, err) => {
                if(resSalary){
                    console.log(resSalary, '*****************resSalary')


                  const empId = Object.keys(resSalary);
                  console.log(empId, '*********empId')
                  const month = req.body.month;
                  const year = req.body.year;
                    helper.saveEmpSalDetails(empId[0], month, year, resSalary).then((salRes) => {
                        console.log(salRes, '*****************salRes')
                        if(salRes.status === 200){
                            res.statusCode = 200;
                            res.send({
                                status: 201,
                                message: 'Employee salary info  fetched!!!',
                                data: resSalary,
                          });
                          res.end();
                        }
       
                    }).catch((err) => {
                       console.log(err, '****err')
       
                    })
                   

                }
               

            })
           

          
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