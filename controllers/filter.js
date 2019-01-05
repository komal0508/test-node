const creds = require('../client_secret.json');
const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1skgyJeC-HP1IS7eluZFsCHbAkL0t8fo72f9brcdq_ko');


module.exports = function (app) {
app.post('ate-sheet', (req, res, next) => {
   console.log('Enter');
   // Create a document object using the ID of the spreadsheet - obtained from its URL.
   // Authenticate with the Google Spreadsheets API.
   doc.useServiceAccountAuth(creds, function (err) {
    let sheetArr = [];
       doc.getInfo(function(err, info) {
           sheet = info.worksheets;
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
          });
        //   console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          // step();
         });
   })
});
};

