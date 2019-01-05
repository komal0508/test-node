const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/register-manager", (req, res, next) => {
   Manager.findOne({
       where: {
       // [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
        email: req.body.email,
       }
   }).then((user) => {
       if (user) {
        console.log('Manager email already exist');
           res.statusCode = 201;
           res.send({
               status: 201,
               message: 'Manager email already exist',
           });
           res.end();
       } else {
        Manager.create({
    email: req.body.email,
     password: req.body.password,
     factory_name: req.body.factoryName,
   })
     .then(users => {
       console.log("User registered!!!");
       if (users) {
          res.statusCode = 200;
          res.send({
              status: 200,
              message: 'Manager registered successfully!',
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