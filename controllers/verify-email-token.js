/**
 * This is a sample API controller which only contains API.
 *
 */
const Manager = require('../models/manager');
const utils = require('../utilities/utils');
const tokenExpirationTime = 28800000;
module.exports = function (app) {
  app.post('/api/verify-email-token', (req, res, next) => {
    utils.validateRequiredKeys(req.body,
      [
        { key: 'email_token', name: 'Email Token' },
      ],
      (errorField) => {
        if (!errorField) {
          Manager.findOne({
            where: {
              email_token: req.body.email_token,
            },
          })
            .then((userFromRepo) => {
              if (!userFromRepo) {
                res.statusCode = 201;
                res.json({
                  status: 201,
                  message: 'Invalid token',
                });
                res.end();
                return;
              }
              if (userFromRepo) {
                const tokenCreatedAt = new Date(userFromRepo.token_date).getTime();
                const newTime = tokenCreatedAt + tokenExpirationTime;
                const currentTime = new Date().getTime();
                if (currentTime > newTime) {
                  console.log('expiredToken');
                  res.statusCode = 203;
                  res.json({
                    status: 203,
                    message: 'Invalid token',
                  });
                  res.end();
                } else {
                  Manager.update({
                    isVerified: true,
                    email_token: null,
                  }, {
                      where: {
                        email_token: req.body.email_token,
                      },
                    })
                    .then((result) => {
                      if (result) {
                        res.json({
                          status: 200,
                          message: ' Email verified successfully ',
                          result: userFromRepo,
                        });
                      } else {
                        res.json({
                          status: 205,
                          message: ' Email verification unsuccessfully',
                        });
                      }
                    })
                    .catch((error) => {
                      res.statusCode = 500;
                      res.json({
                        status: 500,
                        message: 'Oops!, something went wrong with api',
                      });
                      res.end();
                    });
                }
                 
              }
            })
            .catch((err) => {
              res.statusCode = 501;
              res.json({
                status: 501,
                message: 'Oops!, something went wrong with api',
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
