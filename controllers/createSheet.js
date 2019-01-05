const creds = require('../client_secret.json');
const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1skgyJeC-HP1IS7eluZFsCHbAkL0t8fo72f9brcdq_ko');


module.exports = function (app) {
app.post('/api/create-sheet', (req, res, next) => {
   console.log('Enter');
   // Create a document object using the ID of the spreadsheet - obtained from its URL.
   // Authenticate with the Google Spreadsheets API.
   doc.useServiceAccountAuth(creds, function (err) {
    let sheetArr = [];
       // Get all of the rows from the spreadsheet.
       //   doc.getRows(1, function (err, rows) {
       //     console.log(rows);
       //   });

       // doc.addRow('Jan', { last_name: new Date(), first_name: req.body.firstName }, function (err) {
       //     if (err) {
       //         console.log(err);
       //     }
       //     res.send({ status: 201, message: 'inserted successfully'})
       // });
       doc.getInfo(function(err, info) {
           console.log('Loaded doc id:' +info.id+'Loaded doc: '+info.title+' by '+info.author.email);
           sheet = info.worksheets;
         //  console.log('sheets', sheet);
           let sheetObj = {};
          
           console.log('Sheet length', sheet.length);
           for (let i = 0; i < sheet.length; i++) {
            sheetObj = {
                   id: i + 1,
                   sheetTitle: sheet[i].title,
               };
               sheetArr.push(sheetObj);
           }
           console.log('*******************');
           console.log('sheetArr is', sheetArr);
          // console.log('sheet arr is', sheetArr);
           const sheetId =  sheetArr.filter(data => data.sheetTitle === req.body.sheetName);
           console.log('sheetId is', sheetId);
           console.log('id is', sheetId[0].id);
           const id = sheetId[0].id;
            doc.getRows(id, {
            query: `name = ${req.body.id}`,
        },function (err, rows) {
            if(err) {
                console.log('err is', err);
            }
            let obj = {};
            let arr = [];
            console.log('rows length', rows.length);
            for(let i = 0; i < rows.length; i++) {
               obj = {
                   name: rows[i].name,
                   lastName: rows[i].lastname,
               }
               arr.push(obj);
            }
            console.log('arr is', arr);
            if (arr) {
                console.log('arr');
                doc.addWorksheet({
                  title: 'newsheet2'
                }, function(err, sheet) {
               
               
                  // change a sheet's title
                //   sheet.setTitle('new title'); //async
               
                  //resize a sheet
                //   sheet.resize({rowCount: 50, colCount: 20}); //async
               
                  sheet.setHeaderRow(['firstname', 'lastname']);
                  for(let i = 0; i < arr.length; i++) {
                    doc.addRow(6, { firstname: arr[i].name, lastname: arr[i].lastName }, function (err) {
           if (err) {
               console.log(err);
           }
           res.send({ status: 201, message: 'inserted successfully'})
       });
            }
                  if(err){
                        console.log('****err', err)
                    } else {
                   console.log('*******sheet', sheet  ); 
            
 } //async
               
                  // removing a worksheet
                //   sheet.del(); //async
               
                //   step();
                });
    //             for(let i = 0; i < arr.length; i++) {
    //                 doc.addRow(7, { firstname: arr[i].name, lastname: arr[i].lastName }, function (err) {
    //     if (err) {
    //         console.log(err);
    //     }
    //   console.log('Success');
    // });
    //         }
 
           }
          });
        //   console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          // step();
        
         });
       console.log('******************');
       console.log('sheetarr is outside', sheetArr);
//'=QUERY(Jan!$A$2:$B$6, "select * where (A=1)")'
        // doc.getRows(4, {
        //     query: `name = ${req.body.id}`,
        // },function (err, rows) {
        //     if(err) {
        //         console.log('err is', err);
        //     }
        //     let obj = {};
        //     let arr = [];
        //     console.log('rows length', rows.length);
        //     for(let i = 0; i < rows.length; i++) {
        //        obj = {
        //            name: rows[i].name,
        //            lastName: rows[i].lastname,
        //        }
        //        arr.push(obj);
        //     }
        //     console.log('arr is', arr);
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