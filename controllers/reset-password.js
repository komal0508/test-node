/**
 * This is a sample API controller which only contains API.
 *
 */
const Manager = require('../models/manager');
const bcrypt = require('bcrypt-nodejs');
const utils = require('../utilities/utils');

module.exports = function (app) {
  /**
   * Post API which reset password of already registered players
   */
  app.post('/api/reset-password', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'new_password', name: 'New Password' },
        { key: 'confirm_password', name: 'Confirm Password' },
        // { key: 'email_token', name: 'Reset Password Token' },
      ],
      (errorField) => {
        if (!errorField) {
          Manager.findOne({
            where: {
              email: req.body.email,
            },
          })
            .then((userFromRepo) => {
              if (userFromRepo && req.body.new_password === req.body.confirm_password) {
                const passwordHash = bcrypt.hashSync(req.body.new_password);
                Manager.update({
                  password: passwordHash,
                }, {
                  where: {
                    email: req.body.email,
                  },
                })
                .then((updatedPassword) => {
                  if (updatedPassword) {
                    res.json({
                      status: 200,
                      message: ' Password reset successfully ',
                    });
                    res.end();
                  //   Manager.update({
                  //     email_token: null,
                  //   }, {
                  //     where: {
                  //       email_token: req.body.email_token,
                  //     },
                  //   })
                  // .then((result) => {
                  //   if (result) {
                  //     res.json({
                  //       status: 200,
                  //       message: ' Password reset successfully ',
                  //     });
                  //     res.end();
                  //   }
                  // })
                  // .catch((error) => {});
                  }
                })
                .catch((errors) => {
                });
              } else {
                res.json({
                  status: 201,
                  message: ' Password & Confirm Password didn\'t matched ',
                });
                res.end();
              }
            })
            .catch((err) => {
              res.statusCode = 500;
              res.json({
                status: 500,
                message: ' Oopss!, Some error with API ',
              });
              res.end();
            });
        } else {
          res.statusCode = 203;
          res.json({
            status: 203,
            message: errorField,
          });
          res.end();
        }
      });
  });
};
