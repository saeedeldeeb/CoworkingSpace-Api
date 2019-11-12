var createError = require('http-errors');
require('express-async-errors');
const express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('config');
const bodyParser = require('body-parser');
const register = require('./routes/register');
const profile = require('./routes/profile');
const login = require('./routes/login');
const rentAndCafteria = require('./routes/rentAndCafteria');
const events = require('./routes/events');
//Notification
const requestItems = require('./routes/requests/requestItem');
const seeNewRequests = require('./routes/requests/seeNewRequests');
//billing 
const billing = require('./routes/billing/getBillingForUsers');
const billingUpdate = require('./routes/billing/billingUpdate');
//Admin requires
const crudUsers = require('./routes/admin/crudUsers');
const crudCategory = require('./routes/admin/crudCategory');
const crudProduct = require('./routes/admin/crudProducts');
const crudEvent = require('./routes/admin/crudEvents');
//------------
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
mongoose.set('useFindAndModify', false);

//caught uncaught Exceptions
process.on('uncaughtException',(ex)=>{
console.log('WE CAUGHT UNCAUGHT EXCEPTIONS',ex);
});

//caught unhandeled Promises
process.on('uncaughtException',(ex)=>{
  console.log('WE CAUGHT UNHANDELED PROMISES',ex);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('uploads/catImages'));
app.use(express.static('uploads/profileImage'));
app.use(express.static('uploads/eventImages'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users',profile);
app.use('/api/users',register);
app.use('/api',rentAndCafteria);
app.use('/api',events);
app.use('/api/login',login);
app.use('/', indexRouter);
app.use('/users', usersRouter);
//Notification
app.use('/api',[requestItems,seeNewRequests]);
//Billing
app.use('/api/billing',[billing,billingUpdate]);
//Admin uses
app.use('/api/admin',crudUsers);
app.use('/api/admin',crudCategory);
app.use('/api/admin',crudProduct);
app.use('/api/admin',crudEvent);

//----------
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
