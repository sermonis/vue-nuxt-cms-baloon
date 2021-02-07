const createError = require('http-errors');
const express     = require("express");
const morgan      = require('morgan');
const app         = express();
const dotenv      = require('dotenv').config();
const helmet      = require("helmet");
const cors        = require("cors");


app.set('trust proxy', "1");

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN.split(" ") }));

const rateLimiterMiddleware = require('../middleware/limiter');
require('../db/mongo-connection');
app.use(rateLimiterMiddleware);

/* Routes */
const UserRoute   = require('./user/routes/user');
const BalloonRoute = require('./balloons/routes/balloon');

app.use('/user',UserRoute);
app.use('/balloon',BalloonRoute);


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
  if (err.message.substr(4, 2) == "||") {
    const msg = err.message.split("||");
    res.status(msg[0].trim());
    res.send(msg[1].trim());
    /*
    res.send({
        message: msg[1].trim(),
        args: msg[2] ? 
          msg[2].split(',').map(x => x.split(':').map(y => y.trim())).reduce((a, x) => {
              a[x[0]] = x[1];
              return a;
          }, {})
          : {}
      });
    */

  } else {
      // render the error page
    console.error(err.message)
    res.status(err.status || 500);
    res.send(err.message);
  }
});

module.exports = app;