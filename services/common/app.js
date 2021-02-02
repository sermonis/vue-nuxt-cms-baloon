const createError = require('http-errors');
const express     = require("express");
const morgan      = require('morgan');
const app         = express();
const dotenv      = require('dotenv').config();
const helmet      = require("helmet");

const cors        = require("cors");
const UserRoute   = require('./user/routes/user');
const BalloonRoute   = require('./balloons/routes/balloon');

app.set('trust proxy', "1");

app.use(helmet());


// Log  Errors in to file

const fs          = require('fs');
const path        = require('path');



morgan.token('error', (req, res) => req.error);
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url :status :res[content-length] :error', {
  skip: (req, res) => res.statusCode < 500,
  stream: fs.createWriteStream(path.join(__dirname, `/logs/${new Date().toISOString().split('T')[0]}.log`), {flags: 'a'})
}));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN.split(" ") }));

const rateLimiterMiddleware = require('../middleware/limiter');
require('../db/mongo-connection');
app.use(rateLimiterMiddleware);
app.use('/user',UserRoute);
app.use('/balloon',BalloonRoute);

 
app.get("/", async (req, res) => {
  //const moment = require('moment');
  
  //moment('20-10-2020').toDate()
  //res.send(moment("1611001460279").format('YYYY-MM-DD H:m:s') + "\n" + moment("2021-01-18 01:24:20").unix());
  //res.send(new Date("2021-01-18T20:45:16.262+00:00").toString())
// res.send(moment("YYYY-mm-dd 00:00:01").toDate())
  //res.send(moment(moment().format("YYYY-MM-DD 00:00:01")).toDate());
  //res.send(moment("2021-01-18T23:03:39.111+00:00").format("YY-MM-DD HH:mm:ss"))
  //res.send(new Date('2020-01-20').toISOString())
  res.send()
});
  
  // catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  req.error = err.message;
  if (err.message.substr(4, 2) === "||") {
    const msg = err.message.split("||");
    res.status(msg[0].trim());
    res.send({
        message: msg[1].trim(),
        args: msg[2] ? 
          msg[2].split(',').map(x => x.split(':').map(y => y.trim())).reduce((a, x) => {
              a[x[0]] = x[1];
              return a;
          }, {})
          : {}
      });
  } else {
      // render the error page
    
    console.error(err.message)
    res.status(err.status || 500);
    res.send(err.message);
  }
});
/*
process.on('uncaughtException', (error) => {
  console.log(path.join(__dirname, `logs/${new Date().toISOString().split('T')[0]}.log`));
  var accessLogStream = fs.createWriteStream( path.join(__dirname, `logs/${new Date().toISOString().split('T')[0]}.log`), {flags: 'a'});
  accessLogStream.write(new Date()+ '\n'+  error.stack + '\n' + '='.repeat(120)+'\n\n');
  console.error(error);
  //process.exit(1) //mandatory (as per the Node.js docs)
});
*/

module.exports = app;