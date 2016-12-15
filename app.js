var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./model/db');
const dburl = "mongodb://localhost:27017/addrBookDB_v1";

db.connect(dburl,(err)=>{
    if (err) {
        console.log('Unable to connect to Mongo.');
        //process.exit(1)
    }

});


var index = require('./routes/index');
var users = require('./routes/showuser');
var editusers = require('./routes/edituserdata');
var search = require('./routes/search');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/showuser', users);
app.use('/edituserdata', editusers);
app.use('/newuser', editusers);
app.use('/search', search);

// app.use('/showuser/:id', (req,resp,next)=>{
//
//     let id = req.param.id;
//
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{'message':err.message,'error':err});
});

module.exports = app;
