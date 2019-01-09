const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/register-manager", (req, res, next) => {
   Manager.findOne({
       where: {
        email: req.body.email,
       }
   }).then((user) => {
       console.log('user', user);
       if (user) {
        console.log('Manager email already exist');
           res.statusCode = 201;
           res.send({
               status: 201,
               message: 'Manager email already exist',
           });
           res.end();
       } else {
        const passwordHash = bcrypt.hashSync(req.body.password);
        let emailToken = bcrypt.hashSync(req.body.email);
        emailToken = `?${emailToken}`;
        const tokenDate = new Date();
        Manager.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            factory_name: req.body.factoryName,
            contact: req.body.contact,
            email_token: emailToken,
            token_date: tokenDate,
            isVerified: false,
   })
     .then(users => {
       console.log("Manager registered!!!");
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