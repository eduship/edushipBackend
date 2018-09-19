var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var api = require('./backend/routes/apiRouter');

var app = express();

//WEB SERVER:
app.set('port', 8080);
var server = http.createServer(app);
server.listen(8080);
server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}

//Setup Database
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:9347ztg83fhi@ds159459.mlab.com:59459/puk', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful server started on port 8080'))
  .catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, '/frontend')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, '/frontend/error.html'));
});

module.exports = app;
