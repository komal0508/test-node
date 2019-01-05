const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/punch-in", (req, res, next) => { 
  const date = moment(new Date()).format("YYYY-MM-DD");
  //const date = moment().add(10, 'month').calendar();
    console.log('Date !!!!', date);
     const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    Attendance.create({
       emp_id: req.body.empId,
       // name: req.body.name,
        factory_name: req.body.factoryName,
        date: date,
        punch_in: punchIn,
      })
        .then(result => {
          console.log("Attendence info!!");
          if (result) {
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee punch In submitted successfully!',
           });
           res.end();
          }
        })
        .catch(err => {
           console.log(err);
          res.statusCode = 501;
          res.send({
              status: 501,
              message: 'Oops!, Something went wrong with api',
          })
          res.end();
        });
 });
};