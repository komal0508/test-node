const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/delete-employee-info", (req, res, next) => {
    Employee.destroy({
          where: {
          emp_id: req.body.empId,
        // [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
      }
   })
        .then(users => {
          console.log("Employee Info!!!", users);
          if (users) {
              console.log("Employee Info deleted!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee information deleted successfully!',
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