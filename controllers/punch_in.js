const creds = require('../client_secret.json');
const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1skgyJeC-HP1IS7eluZFsCHbAkL0t8fo72f9brcdq_ko');
const moment = require('moment')

module.exports = function (app) {
 app.post('create-sheet', (req, res, next) => {
     // Create a document object using the ID of the spreadsheet - obtained from its URL.
     // Authenticate with the Google Spreadsheets API.
     console.log('************kdsfkd req', req)
     doc.useServiceAccountAuth(creds, function (err) {
         // Get all of the rows from the spreadsheet.
         //   doc.getRows(1, function (err, rows) {
         //     console.log(rows);
         //   });




         doc.getRows(3, {
           query: 'id = 1',
       },function (err, rows) {
           if(err) {
               console.log('err is', err);
           }
           let obj = {};
           let arr = [];
           let totalDuration = 0;
           for(let i = 0; i < rows.length; i++) {
       //        obj = {
       //            name: rows[i].name,
       //            lastName: rows[i].lastname,
       //        }
           const punchInDate = moment(rows[i].punchin);
           const punchOutDate = moment(rows[i].punchout);
           const millisecondsDiff = punchOutDate.diff(punchInDate)
           totalDuration = totalDuration + millisecondsDiff;
       //        arr.push(obj);
           }
           const totalTimeInHoursAndMinutes = moment.utc(totalDuration).format('HH:mm');
           console.log('******totalTimeInHoursAndMinutes', totalTimeInHoursAndMinutes)
         });

       //   doc.addRow(3, { last_name: moment(), first_name: moment() }, function (err) {
       //       if (err) {
       //           console.log(err);
       //       }
       //       res.send({ status: 201, message: 'inserted successfully'})
       //   });

     })
 });
};


//for creating new sheet

//  function managingSheets(step) {
//     doc.addWorksheet({
//       title: 'my new sheet'
//     }, function(err, sheet) {

//       // change a sheet's title
//       sheet.setTitle('new title'); //async

//       //resize a sheet
//       sheet.resize({rowCount: 50, colCount: 20}); //async

//       sheet.setHeaderRow(['name', 'age', 'phone']); //async

//       // removing a worksheet
//       sheet.del(); //async

//       step();
//     });
//   }