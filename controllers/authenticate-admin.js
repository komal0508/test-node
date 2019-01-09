/**
 * This is a sample API controller which only contains API.
 *
 */
const Manager = require('../models/manager');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
//const utils = require('../utilities/utils');
//const AmplitudeHelper = require('../helpers/amplitude/index');
// The only required field is the api token
const Op = Sequelize.Op;
module.exports = function (app) {
  /**
   * Post API which authenticates credentials at the time of login with already registered players
   */
  app.post('/api/authenticate-admin', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
        { key: 'password', name: 'Password' },
      ],
      (errorField) => {
        if (!errorField) {
            Manager.findOne({
            where: {
               email: req.body.email,
            },
          })
            .then((userFromRepo) => {
              if (!userFromRepo) {
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: 'Email doesn\'t exist',
                });
                res.end();
                return;
              }
              const isValidPassword = bcrypt.compareSync(req.body.password, userFromRepo.password);
              if (userFromRepo.email && isValidPassword) {
                res.statusCode = 200;
                res.json({
                  status: 200,
                  message: ' Adimn successfully authenticated ',
                  user: userFromRepo,
                });
              } else {
                res.statusCode = 203;
                res.json({
                  status: 203,
                  message: ' Invalid password ',
                });
                res.end();
              }
            })
            .catch((err) => {
              res.statusCode = 205;
              res.json({
                status: 205,
                message: ' Invalid email ',
              });
              res.end();
            });
        } else {
          res.statusCode = 207;
          res.json({
            status: 207,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
