const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/register-admin", (req, res, next) => {
   Manager.findOne({
       where: {
        email: req.body.email,
       }
   }).then((user) => {
       if (user) {
        console.log('email already exist');
           res.statusCode = 201;
           res.send({
               status: 201,
               message: 'Email already exist',
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
            factory_name: 'all',
            contact: '7404967777',
            email_token: emailToken,
            token_date: tokenDate,
            isVerified: false,
   })
     .then(users => {
       console.log("Admin registered!!!");
       if (users) {
          res.statusCode = 200;
          res.send({
              status: 200,
              message: 'Admin registered successfully!',
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