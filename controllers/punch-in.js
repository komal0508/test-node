// const Attendance = require("../models/attendance");
// const Sequelize = require("sequelize");
// const Op = Sequelize.Op;
// const moment = require('moment');
// module.exports = function(app) {
//  /**
//   * Post API which register employee details.
//   */
//  app.post("/api/punch-in", (req, res, next) => { 
//   const date = moment(new Date()).format("YYYY-MM-DD");
//  // const date = moment().add(10, 'month').calendar();
//     console.log('Date !!!!', date);
//      const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");


//      Attendance.findOne({
//       where: {
//         emp_id: req.body.empId,
//         is_break_time: true,
//         date: moment(new Date()).format("YYYY-MM-DD"),
//     },
//     order: [['createdAt', 'DESC']],
//    })
//         .then(data => { 
//           console.log('*********attend', data);
//           if (data && data.punch_out !== null) {
//             const previousPunchOutMili = moment(data.punch_out).valueOf() + 3600000;
//             const newPunchInMili = moment(punchIn).valueOf();
//             const difference = previousPunchOutMili - newPunchInMili;
//             console.log( '*********attendmili', previousPunchOutMili, newPunchInMili, difference)
//             if(difference > 0){

//               const newPunchInWithDiff = newPunchInMili + difference;
//               const finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");
//               console.log(finalPunchIn, '*******finalPunchIn')

//               Attendance.create({
//                 emp_id: req.body.empId,
//                 // name: req.body.name,
//                  factory_name: req.body.factoryName,
//                  date: date,
//                  is_office_work: req.body.isOfficeWork,
//                  punch_in: finalPunchIn,
//                  is_break_time: false
//                })
//                  .then(result => {
//                    console.log("Attendence info!!");
//                    if (result) {
//                       res.statusCode = 200;
//                       res.send({
//                           status: 200,
//                           message: 'Employee punch In submitted successfully!',
//                     });
//                     res.end();
//                    }
//                  })
//                  .catch(err => {
//                     console.log(err);
//                    res.statusCode = 501;
//                    res.send({
//                        status: 501,
//                        message: 'Oops!, Something went wrong with api',
//                    })
//                    res.end();
//                  });

//             }  else {
//               console.log('*####*********data', data);
//               console.log('***###isOfficeWork', req.body.isOfficeWork);
//               Attendance.create({
//                 emp_id: req.body.empId,
//                 // name: req.body.name,
//                  factory_name: req.body.factoryName,
//                  date: date,
//                  punch_in: punchIn,
//                  is_office_work: req.body.isOfficeWork,
//                  is_break_time: false
//                })
//                  .then(result => {
//                    console.log("Attendence info!!");
//                    if (result) {
//                       res.statusCode = 200;
//                       res.send({
//                           status: 200,
//                           message: 'Employee punch In submitted successfully!',
//                     });
//                     res.end();
//                    }
//                  })
//                  .catch(err => {
//                     console.log(err);
//                    res.statusCode = 501;
//                    res.send({
//                        status: 501,
//                        message: 'Oops!, Something went wrong with api',
//                    })
//                    res.end();
//                  });
//             }
//           } else {
//             Attendance.findOne({
//               where: {
//                 emp_id: req.body.empId,
//                 is_break_time: false,
//                 date: moment(new Date()).format("YYYY-MM-DD"),
//             },
//             order: [['createdAt', 'DESC']],
//             })
//             .then((data) => {
//               console.log('**********data', data);
//               console.log('***isOfficeWork', req.body.isOfficeWork);
//               if(data && data.punch_out !== null && !data.is_office_work) {
//                 Attendance.create({
//                   emp_id: req.body.empId,
//                   // name: req.body.name,
//                    factory_name: req.body.factoryName,
//                    date: date,
//                    is_office_work: req.body.isOfficeWork,
//                    punch_in: punchIn,
//                    is_break_time: false,
//                  })
//                    .then(result => {
//                      console.log("Attendence info!!");
//                      if (result) {
//                         res.statusCode = 200;
//                         res.send({
//                             status: 200,
//                             message: 'Employee punch In submitted successfully!',
//                       });
//                       res.end();
//                      }
//                    })
//                    .catch(err => {
//                       console.log(err);
//                      res.statusCode = 501;
//                      res.send({
//                          status: 501,
//                          message: 'Oops!, Something went wrong with api',
//                      })
//                      res.end();
//                    });
//               } else if(data && data.punch_out === null && data.is_office_work) {
//                 Attendance.create({
//                   emp_id: req.body.empId,
//                   // name: req.body.name,
//                    factory_name: req.body.factoryName,
//                    date: date,
//                    is_office_work: req.body.isOfficeWork,
//                    punch_in: punchIn,
//                    is_break_time: false,
//                  })
//                    .then(result => {
//                      console.log("Attendence info!!");
//                      if (result) {
//                         res.statusCode = 200;
//                         res.send({
//                             status: 200,
//                             message: 'Employee punch In submitted successfully!',
//                       });
//                       res.end();
//                      }
//                    })
//                    .catch(err => {
//                       console.log(err);
//                      res.statusCode = 501;
//                      res.send({
//                          status: 501,
//                          message: 'Oops!, Something went wrong with api',
//                      })
//                      res.end();
//                    });
//               } else if (data && data.punch_out === null && !data.is_office_work){
//                 const isAlreadyPunchIn = true;
//               res.statusCode = 203;
//               res.send({
//                 status: 203,
//                 message: 'You are already punch in!',
//                 data: isAlreadyPunchIn,
//               });
//               res.end();
//               } else {
//                 console.log('Enter');
//                 Attendance.create({
//                   emp_id: req.body.empId,
//                   // name: req.body.name,
//                    factory_name: req.body.factoryName,
//                    date: date,
//                    is_office_work: req.body.isOfficeWork,
//                    punch_in: punchIn,
//                    is_break_time: false,
//                  })
//                    .then(result => {
//                      console.log("Attendence info!!");
//                      if (result) {
//                         res.statusCode = 200;
//                         res.send({
//                             status: 200,
//                             message: 'Employee punch In submitted successfully!',
//                       });
//                       res.end();
//                      }
//                    })
//                    .catch(err => {
//                       console.log(err);
//                      res.statusCode = 501;
//                      res.send({
//                          status: 501,
//                          message: 'Oops!, Something went wrong with api',
//                      })
//                      res.end();
//                    });
//               }
//             })
//             .catch((error) => {
//               console.log('Error!!', error);
//             })



//           }
//         })
//         .catch(err => {
//            console.log(err);
//            res.statusCode = 500;
//            res.send({
//                status: 500,
//                message: 'Oops!, Something went wrong with api'
//            });
//            res.end();
//         });

//  });
// };



const Attendance = require("../models/attendance");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/punch-in", (req, res, next) => { 
  const date = moment(new Date()).format("YYYY-MM-DD");
 // const date = moment().add(10, 'month').calendar();
    console.log('Date !!!!', date);
     const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
         Attendance.findOne({
      where: {
        emp_id: req.body.empId,
       // is_break_time: true,
        date: moment(new Date()).format("YYYY-MM-DD"),
    },
    order: [['createdAt', 'DESC']],
   })
   .then((data) => {
     if(data && data.punch_out === null){
      Attendance.create({
        emp_id: req.body.empId,
        // name: req.body.name,
         factory_name: req.body.factoryName,
         date: date,
         punch_in: punchIn,
         is_office_work: req.body.isOfficeWork,
         is_break_time: false
       })
         .then(result => {
           console.log("Attendence info!!");
           if (result) {
              res.statusCode = 200;
              res.send({
                  status: 200,
                  message: 'Employee punch In submitted successfully!',
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
     else if(data && data.is_break_time) {
      const previousPunchOutMili = moment(data.punch_out).valueOf() + 3600000;
                  const newPunchInMili = moment(punchIn).valueOf();
                  const difference = previousPunchOutMili - newPunchInMili;
                  const finalPunchIn = punchIn;
                  console.log( '*********attendmili', previousPunchOutMili, newPunchInMili, difference)
                  if(difference > 0){
      
                    const newPunchInWithDiff = newPunchInMili + difference;
                   // const finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");
                   finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");
                    console.log(finalPunchIn, '*******finalPunchIn')
      
                    // Attendance.create({
                    //   emp_id: req.body.empId,
                    //   // name: req.body.name,
                    //    factory_name: req.body.factoryName,
                    //    date: date,
                    //    is_office_work: req.body.isOfficeWork,
                    //    punch_in: finalPunchIn,
                    //    is_break_time: false
                    //  })
                    //    .then(result => {
                    //      console.log("Attendence info!!");
                    //      if (result) {
                    //         res.statusCode = 200;
                    //         res.send({
                    //             status: 200,
                    //             message: 'Employee punch In submitted successfully!',
                    //       });
                    //       res.end();
                    //      }
                    //    })
                    //    .catch(err => {
                    //       console.log(err);
                    //     //  res.statusCode = 501;
                    //     //  res.send({
                    //     //      status: 501,
                    //     //      message: 'Oops!, Something went wrong with api',
                    //     //  })
                    //     //  res.end();
                    //    });
     } 
                    console.log('*####*********data', data);
                    console.log('***###isOfficeWork', req.body.isOfficeWork, finalPunchIn);
                    Attendance.create({
                      emp_id: req.body.empId,
                      // name: req.body.name,
                       factory_name: req.body.factoryName,
                       date: date,
                       punch_in: finalPunchIn,
                       is_office_work: req.body.isOfficeWork,
                       is_break_time: false
                     })
                       .then(result => {
                         console.log("Attendence info!!");
                         if (result) {
                            res.statusCode = 200;
                            res.send({
                                status: 200,
                                message: 'Employee punch In submitted successfully!',
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


    /////////////
    else if(data && !req.body.isOfficeWork && data.punch_out === null) {
      res.statusCode = 203;
      res.send({
        status: 203,
        message: 'You are already punch-in'
      });
      res.end();
    } else if(data && req.body.isOfficeWork && data.punch_out === null) {
      console.log('********************');
      console.log('resp in punch in is', punchIn);
      console.log('***************');
      const punchInDate = moment(data.punch_in);
      const punchOutDate = moment(punchIn);
      const millisecondsDiff = punchOutDate.diff(punchInDate)
      const newMilliSeconds = millisecondsDiff + 3600000;// for breaktime
      console.log('millseconds', newMilliSeconds);
      const totalTimeInHoursAndMinutes = moment.utc(newMilliSeconds).format('HH:mm');
      console.log('******totalTimeInHoursAndMinutes', totalTimeInHoursAndMinutes);
      Attendance.update({
        punch_out: punchIn,
        time_mill: millisecondsDiff,
        total_time: totalTimeInHoursAndMinutes,
     }, {
        where: {
          [Op.and]: [{punch_in: data.punch_in}, {id: data.id}]
          // punch_in: data.punch_in,
        }
     })
     .then((result) => {
        console.log('result is', result);
        if (result && result[0] && result.length > 0) {
          console.log("Attendance Punch out submitted successfully!!!");
          console.log('*####@@*********data', data);
          console.log('***###@@@isOfficeWork', req.body.isOfficeWork);
          Attendance.create({
            emp_id: req.body.empId,
            // name: req.body.name,
             factory_name: req.body.factoryName,
             date: date,
             punch_in: punchIn,
             is_office_work: req.body.isOfficeWork,
             is_break_time: false
           })
             .then(result => {
               console.log("Attendence info!!");
               if (result) {
                  res.statusCode = 200;
                  res.send({
                      status: 200,
                      message: 'Employee punch In submitted successfully!',
                });
                res.end();
               }
             })
             .catch(erro => {
                console.log('erro',erro);
              //  res.statusCode = 501;
              //  res.send({
              //      status: 501,
              //      message: 'Oops!, Something went wrong with api',
              //  })
              //  res.end();
             });
          // res.statusCode = 200;
          // res.send({
          // status: 200,
          // message: 'Attendance Punch out submitted successfully!',
   //});
 //   res.end();
    } else {
          console.log('Attendence Not updated!!');
        res.statusCode = 201;
        res.send({
            status: 201,
            message: 'Attendence punch out time not submitted!!!',
        })
        res.end();
      }
     })
     .catch((error) => {
        console.log('error !!!', error);
     })
    } else if(data && req.body.isOfficeWork && data.punch_out !== null) {
      console.log('Enter');
      Attendance.create({
        emp_id: req.body.empId,
        // name: req.body.name,
         factory_name: req.body.factoryName,
         date: date,
         punch_in: punchIn,
         is_office_work: req.body.isOfficeWork,
         is_break_time: false
       })
         .then(result => {
           console.log("Attendence info!!");
           if (result) {
              res.statusCode = 200;
              res.send({
                  status: 200,
                  message: 'Employee punch In submitted successfully!',
            });
            res.end();
           }
         })
         .catch(erro => {
            console.log('erro',erro);
          //  res.statusCode = 501;
          //  res.send({
          //      status: 501,
          //      message: 'Oops!, Something went wrong with api',
          //  })
          //  res.end();
         });
    } else if(data && !req.body.is_office_work && data.punch_out !== null) {
      console.log('Enter');
      Attendance.create({
        emp_id: req.body.empId,
        // name: req.body.name,
         factory_name: req.body.factoryName,
         date: date,
         punch_in: punchIn,
         is_office_work: req.body.isOfficeWork,
         is_break_time: false
       })
         .then(result => {
           console.log("Attendence info!!");
           if (result) {
              res.statusCode = 200;
              res.send({
                  status: 200,
                  message: 'Employee punch In submitted successfully!',
            });
            res.end();
           }
         })
         .catch(erro => {
            console.log('erro',erro);
          //  res.statusCode = 501;
          //  res.send({
          //      status: 501,
          //      message: 'Oops!, Something went wrong with api',
          //  })
          //  res.end();
         });
    } else {
      console.log('Enter data');
      Attendance.create({
        emp_id: req.body.empId,
        // name: req.body.name,
         factory_name: req.body.factoryName,
         date: date,
         punch_in: punchIn,
         is_office_work: req.body.isOfficeWork,
         is_break_time: false
       })
         .then(result => {
           console.log("Attendence info!!");
           if (result) {
              res.statusCode = 200;
              res.send({
                  status: 200,
                  message: 'Employee punch In submitted successfully!',
            });
            res.end();
           }
         })
         .catch(erro => {
            console.log('erro',erro);
          //  res.statusCode = 501;
          //  res.send({
          //      status: 501,
          //      message: 'Oops!, Something went wrong with api',
          //  })
          //  res.end();
         });
    }
   })
   .catch((er) => {
     console.log('err', er);
   });

 });
};