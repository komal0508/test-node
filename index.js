const http = require('http');
const express = require('express');
const rMyRoute = express.Router();
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const db = require('./config/db');
const config = require('./config/config.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 next();
});

fs.readdirSync(`${__dirname}/controllers`).forEach((file) => {
  if (file.substr(-3) === '.js') {
    const pathToController = `${__dirname}/controllers/${file}`;
   // console.log(pathToController, 'pathToController');
    router = require(pathToController)(app);
    app.use(pathToController, rMyRoute);
  }
  db.sync();
 });


app.listen(port, hostname, (err) => {
 if (err) {
   return console.log('*******err', err);
 }

     console.log('app listining on port ', port);
 
});
