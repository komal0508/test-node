const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/update-manager-info", (req, res, next) => {
    const passwordHash = bcrypt.hashSync(req.body.password);

    Manager.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: passwordHash,
       factory_name: req.body.factory_name,
       contact: req.body.contact,
      }, {
          where: {
          email: req.body.email,
      //   [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]

      }
   })
        .then(users => {
          console.log("Manager Info!!!", users[0]);
          if (users && users[0] && users.length && users.length > 0) {
              console.log("Manager Info Updated!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Manager information updated successfully!',
           });
           res.end();
          } else {
              console.log('Email doesn\'t exist!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message: 'Email doesn\'t exist!',
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