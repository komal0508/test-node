const OfficeWork = require("../models/office_work");
const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/office-work-punch-in", (req, res, next) => { 
    //const date = moment(new Date()).format("YYYY-MM-DD");
  const date = moment().add(10, 'month').calendar();
    console.log('Date !!!!', date);
     const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

     Employee.findOne({
        where: {
        emp_id: req.body.empId,
    }
 })
      .then(users => {
        if (users) {
            OfficeWork.create({
                emp_id: req.body.empId,
                name: users.first_name,
                date: date,
                punch_in: punchIn,
                factory_name: req.body.factoryName,
                purpose: req.body.purpose,
               })
                 .then(result => {
                   console.log("office work info!!");
                   if (result) {
                      res.statusCode = 200;
                      res.send({
                          status: 200,
                          message: 'Employee office work punch In submitted successfully!',
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

        } else {
            console.log('Employee ID doesn\'t exist!');
          res.statusCode = 201;
          res.send({
              status: 201,
              message: 'Employee ID doesn\'t exist!',
          })
          res.end();
        }
      })
      .catch(err => {
         console.log(err);
         res.statusCode = 500;
         res.send({
             status: 500,
             message: 'Oops!, Something went wrong with api'
         });
         res.end();
      });

 });
};