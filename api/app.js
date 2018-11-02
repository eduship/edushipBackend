var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var session = require('express-session');
var auth = require('./auth/user_auth.js');

var apiRouter = require('./routes/apiRouter');

var app = express();

//WEB SERVER:
app.set('port', 4000);
var server = http.createServer(app);
server.listen(4000);
server.on('error', onError);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}

//Setup Database
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:9347ztg83fhi@ds159459.mlab.com:59459/puk', {promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection succesful server started on port 4000'))
  .catch((err) => console.error(err));

//setup view engine 
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

//Setup the standard stuff  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'template')));

//Setup Session Handling

app.use(session(
  {
    name: 'Sz1QakKaWD',
    secret: 'E58§HNiVoC&wGZxYh4JqR/Hh90§)CBaM6§PM9cpu',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 150000
    }
  }
));


app.use(auth.initialize());
app.use(auth.session());

//Setup Routes
app.use('/', apiRouter);

//login POST Route has to be manually set in app.js
app.post('/login',
    auth.authenticate('local', {
        // redirect back to /login
        // if login fails
        failureFlash: false,
        successMessage: false,
        failureRedirect: '/event/all'
    }),
 
    // end up at / if login works
    function (req, res) {
        res.send({"loggedIn": true});
    }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, '../shared/error.html'));
  });
  
  module.exports = app;