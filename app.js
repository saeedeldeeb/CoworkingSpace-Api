var createError = require('http-errors');
require('express-async-errors');
const express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('config');
const profile = require('./routes/profile');
const login = require('./routes/login');
const rentAndCafteria = require('./routes/rentAndCafteria');
const events = require('./routes/events');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const error = require('./middleware/error');


const app = express();
// connection to mongoose
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true , useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected ');
});

//caught uncaught Exceptions
process.on('uncaughtException',(ex)=>{
console.log('WE CAUGHT UNCAUGHT EXCEPTIONS');
});

//caught unhandeled Promises
process.on('uncaughtException',(ex)=>{
  console.log('WE CAUGHT UNHANDELED PROMISES');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',rentAndCafteria);
app.use('/api',events);
app.use('/api/users',profile);
app.use('/api/login',login);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(error);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler test
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
