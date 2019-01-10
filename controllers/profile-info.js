const Attendance = require("../models/attendance");
const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');

module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-profile-info", (req, res, next) => {
    Employee.findOne({
        where: {
            emp_id: req.body.empId,
        },
    })
    .then((response) => {
        console.log('******');
        console.log('response', response);
        if(response) {
     Attendance.findOne({
        where: {
            emp_id: req.body.empId,
            date: moment(new Date()).format("YYYY-MM-DD"),
        },
        order: [['createdAt', 'DESC']],
    })
    .then((result) => {
        console.log('result!!', result);
        let obj = {};
        if(result) {
             obj = {
                 empData: response,
                 punchIn: result.punch_in,
             }
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Data fetched!',
                 data: obj,
             });
             res.end();
        } else {
            res.statusCode = 202;
            res.send({
                status: 202,
                message: 'Data fetched but there is no punch in by this employee!',
                data: response,
            });
            res.end();
        }
    })
    .catch((error) => {
        console.log('Error', error);
    });
        }
    })
    .catch((err) => {
        console.log('err', err);
    });
 });
}