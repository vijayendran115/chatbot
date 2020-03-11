require('dotenv').config()

var express = require('express');

var app = express();
var cookieParser = require('cookie-parser');
var path = require('path');
var ev = require('express-validation');
var HttpStatus = require('http-status-codes');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Health checkup
app.get('/health', (req, res) => res.send());

const botRoutes = require('./routes/bot');
app.use('/', [
  botRoutes
]);

// Handle 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = HttpStatus.NOT_FOUND;
  next(err);
})

// error handler
app.use(function (err, req, res, next) {
  // specific for validation errors
  if (err instanceof ev.ValidationError) { 
    return res.status(err.status).json(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);

  if([HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR].includes(err.status)){
    res.render(`./error/${err.status}.ejs`);
  }

  res.render(`./error/${HttpStatus.NOT_FOUND}.ejs`);
});

module.exports = app;