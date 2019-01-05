const OfficeWork = require("../models/office_work");
const Employee = require("../models/employee");
const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/fetch-notifications", (req, res, next) => { 
     Manager.findOne({
        where: {
        email: req.body.email,
    }
 })
      .then(users => {
        if (users) {
            OfficeWork.findAll({
                where: {
                    factory_name: users.factory_name,
                    isAccepted: null,
                    //[Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
                }
            })
                .then(users => {
                  console.log("OfficeWork Info!!!");
                  if (users && users.length && users.length > 0) {
                      console.log("OfficeWork Information fetched!!!");
                     res.statusCode = 200;
                     res.send({
                         status: 200,
                         message: 'OfficeWork Information fetched!!!',
                         data: users,
                   });
                   res.end();
                  } else {
                      console.log('no enteries exist!!');
                    res.statusCode = 201;
                    res.send({
                        status: 201,
                        message: 'no enteries exist!!',
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
        } else {
            console.log('manager doesn\'t exist!');
          res.statusCode = 201;
          res.send({
              status: 201,
              message: 'manager doesn\'t exist!',
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