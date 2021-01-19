const createError = require('http-errors');
const express     = require("express");
const logger      = require('morgan');
const app         = express();
const dotenv      = require('dotenv').config();
const helmet      = require("helmet");

const cors        = require("cors");
const userRoute   = require('./routes/user');

app.set('trust proxy', "1");
app.use(helmet());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN.split(" ") }));

const rateLimiterMiddleware = require('../middleware/limiter');

require('./mongo-connection');
app.use(rateLimiterMiddleware);
app.use(userRoute);

  
 
app.get("/", async (req, res) => {
  const moment = require('moment');
  //res.send(moment("1611001460279").format('YYYY-MM-DD H:m:s') + "\n" + moment("2021-01-18 01:24:20").unix());
  //res.send(new Date("2021-01-18T20:45:16.262+00:00").toString())
// res.send(moment("YYYY-mm-dd 00:00:01").toDate())
  //res.send(moment(moment().format("YYYY-MM-DD 00:00:01")).toDate());
  //res.send(moment("2021-01-18T23:03:39.111+00:00").format("YY-MM-DD HH:mm:ss"))
  res.send(new Date().toISOString())
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

module.exports = app;