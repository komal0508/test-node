const Employee = require("../models/employee");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/register", (req, res, next) => {
     console.log('*****dfkdkfd', req.body)
   Employee.findOne({
       where: {
       // [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
        emp_id: req.body.empId,
       }
   }).then((user) => {
       if (user) {
        console.log('Employee Id already exist');
           res.statusCode = 201;
           res.send({
               status: 201,
               message: 'Employee Id already exist!',
           });
           res.end();
       } else {
        console.log('*****dfkdkfd1', req)
    Employee.create({
     emp_id: req.body.empId,
     first_name: req.body.firstName,
     last_name: req.body.lastName,
    // name: req.body.name,
     contact: req.body.contact,
     factory_name: req.body.factoryName,
     salary: req.body.salary,
   })
     .then(users => {
       console.log("User registered!!!");
       if (users) {
          res.statusCode = 200;
          res.send({
              status: 200,
              message: 'Employee registered successfully!',
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
       }
   }).catch((err) => {
       res.statusCode = 500;
       res.send({
           status: 500,
           message: 'Oops!, Something went wrong with api'
       });
       res.end();
   })
 });
};