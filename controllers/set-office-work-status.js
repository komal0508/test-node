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
 app.post("/api/set-office-work-status", (req, res, next) => { 

    OfficeWork.findOne({
        where: {
        id: req.body.id,
    }
 })
      .then(works => {
        console.log("Employee Info!!!", works);
        if (works) {

            OfficeWork.update({
                is_accepted: req.body.is_accepted,
                comment: req.body.comments,
               }, {
                  where: {
                     id: req.body.id,
                  }
               })
               .then((result) => {
                  console.log('result is', result);
                  if (result && result[0] && result.length > 0) {
                    console.log("Attendance office work status updated successfully!!!");
                    res.statusCode = 200;
                    res.send({
                    status: 200,
                    message: 'Attendance office work status updated successfully!',
             });
              res.end();
              } else {
                    console.log('office work status Not updated!!');
                  res.statusCode = 201;
                  res.send({
                      status: 201,
                      message: 'office work status break time not updated!!!',
                  })
                  res.end();
                }
               })
               .catch((error) => {
                  console.log('error !!!', error);
               })
        } else {
            console.log('entry  doesn\'t exist!');
          res.statusCode = 201;
          res.send({
              status: 201,
              message: 'entry doesn\'t exist!',
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