const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-employee-by-id", (req, res, next) => {
    Employee.findOne({
          where: {
          emp_id: req.body.empId,
      }
   })
        .then(users => {
          console.log("Employee Info!!!", users);
          if (users) {
              console.log("Employee Information fetched!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee Information fetched',
                 data: users,
           });
           res.end();
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