const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-employees-by-factory-name", (req, res, next) => {
    Employee.findAll({
        where: {
            factory_name: req.body.factoryName,
            //[Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
        }
    })
        .then(users => {
          console.log("Employee Info!!!");
          if (users && users.length && users.length > 0) {
              console.log("Employee Information fetched!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee Information fetched!!!',
                 data: users,
           });
           res.end();
          } else {
              console.log('factory name doesn\'t exist!!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'factory name doesn\'t exist!!',
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