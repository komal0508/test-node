const Manager = require("../models/manager");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = function(app) {
 /**
  * Post API which update the employee details.
  */
 app.post("/api/get-manager-factory", (req, res, next) => {
    Manager.findOne({
          where: {
          //  [Op.and]: [{name: req.body.name}, {factory_name: req.body.factoryName}]
          email: req.body.email,
      }, 
      attributes: ['email', 'factory_name'],
   })
        .then(users => {
          console.log("Manager Info!!!", users);
          if (users) {
              console.log("Manager factory name fetched!!!");
             res.statusCode = 200;
             res.send({
                 status: 200,
                 message: 'Manager factory name fetched',
                 data: users,
           });
           res.end();
          } else {
              console.log('Manager email doesn\'t exist!');
            res.statusCode = 201;
            res.send({
                status: 201,
                message:'Manager email doesn\'t exist!',
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