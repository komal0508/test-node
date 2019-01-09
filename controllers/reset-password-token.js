/**
 * This is a sample API controller which only contains API.
 *
 */
const Manager = require('../models/manager');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');
const EmailHelper = require('../send-email');
module.exports = function (app) {
  /**
   * Post API which authenticates email credentials at the time of forgot password for already registered players
   */
  app.post('/api/reset-password-token', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email', name: 'Email' },
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
              if (userFromRepo.email) {
                let resetPasswordToken = bcrypt.hashSync(userFromRepo.email);
                resetPasswordToken = `?${resetPasswordToken}`;
                const tokenDate = new Date();
                Manager.update({
                  email_token: resetPasswordToken,
                  token_date: tokenDate,
                }, {
                    where: {
                      email: userFromRepo.email,
                    },
                  }).then((response) => {
                  //  const hostname = req.body.hostName;
                  const hostname = 'localhost'
                    const port = hostname === 'localhost' ? ':3000' : '';
                    const hyperText = hostname === 'localhost' ? 'http' : 'https';
                    const resetUrl = `${hyperText}://${hostname}${port}/reset-password${resetPasswordToken}`;
                    console.log('*******resetPasswordLink', resetUrl);
                    EmailHelper.sendMail(userFromRepo.email, resetUrl);
                    res.statusCode = 202;
                    res.json({
                      status: 202,
                      message: 'Email Token has been sent',
                      resetUrl,
                });
                })
                  .catch((err) => {
                    res.statusCode = 203;
                    res.json({
                      status: 203,
                      message: ' Email token cannot updated',
                    });
                    res.end();
                  });
              } else {
                res.statusCode = 205;
                res.json({
                  status: 205,
                  message: ' Invalid email ',
                });
                res.end();
              }
            })
            .catch((err) => {
              res.statusCode = 500;
              res.json({
                status: 500,
                message: ' Oops!, something went wrong with api ',
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
