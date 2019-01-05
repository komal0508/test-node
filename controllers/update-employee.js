const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/edit-employee-info", (req, res, next) => {
     const length = req.body.contact.length;
     const contact = req.body.contact;
     const empId = contact.substring(length - 4, length) + req.body.firstName;
     console.log('Emp id', empId);
    Employee.update({
        emp_id: empId,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
       // name: req.body.newName,
        contact: req.body.contact,
        factory_name: req.body.factoryName,
        salary: req.body.salary,
        category: req.body.category,
        shift_time: req.body.shiftTime,
        salary_value: req.body.salaryValue,
      }, {
          where: {
          emp_id: req.body.empId,
      //   [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]

      }
   })
        .then(users => {
          console.log("Employee Info!!!", users[0]);
          if (users && users[0] && users.length && users.length > 0) {
              console.log("Employee Info Updated!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Employee information updated successfully!',
           });
           res.end();
          } else {
              console.log('Employee Id doesn\'t exist!');
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