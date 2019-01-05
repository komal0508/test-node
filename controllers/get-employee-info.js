const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-all-employee-info", (req, res, next) => {
    Employee.findAll({
        where: {
            factory_name: req.body.factoryName,
        }
    })
        .then(users => {
          console.log("Employee Info!!!", users);
          console.log('****************');
          console.log('employee data length', users.length);
          console.log('data!!!', users[0]);
          console.log('**********************');
          if (users) {
              console.log("Employee Information fetched!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee Information fetched!',
                 data: users,
           });
           res.end();
          } else {
              console.log('Employee information not fetched');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Employee information not fetched!!',
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