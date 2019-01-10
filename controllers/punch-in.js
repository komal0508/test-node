const Attendance = require("../models/attendance");
const OfficeWork = require('../models/office_work');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');
module.exports = function(app) {
 /**
  * Post API which register employee details.
  */
 app.post("/api/punch-in", (req, res, next) => { 
  const date = moment(new Date()).format("YYYY-MM-DD");
  //const date = moment().add(5, 'month').calendar();
     const punchIn = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
         Attendance.findOne({
      where: {
        emp_id: req.body.empId,
        date: moment(new Date()).format("YYYY-MM-DD"),
    },
    order: [['createdAt', 'DESC']],
   })
   .then((data) => {
     console.log('Enter', data);
     console.log('&&&&&&&&&&&&&&');
     if(data && data.punch_out === null) {
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
              }
           })
           .then((response) => {
             if(response) {
                

      Attendance.create({
        emp_id: req.body.empId,
         factory_name: req.body.factoryName,
         date: date,
         punch_in: punchIn,
         is_office_work: req.body.isOfficeWork,
         is_break_time: false
       })
         .then(result => {
           console.log("Attendence info!!");
           if(result && req.body.isOfficeWork === 'true' || req.body.isOfficeWork){
            console.log('Enter office work');
           OfficeWork.create({
             attendence_id: result.id,
              purpose: req.body.purpose,
           }).then((resp) => {
             console.log('resp', resp);
             res.statusCode = 200;
             res.send({
               status: 200,
               message: 'Attendance punch in successfully!!!',
             });
             res.end();
           })
          }
         })
         .catch(err => {
            console.log(err);
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
             console.log('er', er);
           })
     }
     else if(data && data.is_break_time) {
      const previousPunchOutMili = moment(data.punch_out).valueOf() + 3600000;
                  const newPunchInMili = moment(punchIn).valueOf();
                  const difference = previousPunchOutMili - newPunchInMili;
                  let finalPunchIn = punchIn;
                  console.log( '*********attendmili', previousPunchOutMili, newPunchInMili, difference)
                  if(difference > 0){
      
                    const newPunchInWithDiff = newPunchInMili + difference;
                   // const finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");
                   finalPunchIn = moment(newPunchInWithDiff).format("YYYY-MM-DD hh:mm:ss");
                    console.log(finalPunchIn, '*******finalPunchIn')
      } 
                   console.log('*####*********data', data);
                    console.log('***###isOfficeWork', req.body.isOfficeWork, finalPunchIn);
                    Attendance.create({
                      emp_id: req.body.empId,
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
                        //  res.statusCode = 501;
                        //  res.send({
                        //      status: 501,
                        //      message: 'Oops!, Something went wrong with api',
                        //  })
                        //  res.end();
                       });         
        } else {
        console.log('officeWork', req.body.isOfficeWork);
        console.log('***********', typeof req.body.isOfficeWork);
       Attendance.create({
        emp_id: req.body.empId,
        factory_name: req.body.factoryName,
        date: date,
        punch_in: punchIn,
        is_office_work: req.body.isOfficeWork,
        is_break_time: false
       })
       .then((result) => {
         if(result && req.body.isOfficeWork === 'true' || req.body.isOfficeWork){
           console.log('Enter office work');
          OfficeWork.create({
            attendence_id: result.id,
             purpose: req.body.purpose,
          }).then((resp) => {
            console.log('resp', resp);
            res.statusCode = 200;
            res.send({
              status: 200,
              message: 'Attendance punch in successfully!!!',
            });
            res.end();
          })
         }
       })
       .catch((error) => {
        console.log('error', error);
       });
    } 
   })
   .catch((er) => {
     console.log('err', er);
   });

 });
};