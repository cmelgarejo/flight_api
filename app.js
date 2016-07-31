require('coffee-script/register');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

/**
 Expose the needed routes for the SPA, and the API's
*/
var spa = require('./routes/index');
var airlines = require('./routes/api/airlines');
var airports = require('./routes/api/airports');
var search = require('./routes/api/search');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', spa);
app.use('/api/airlines', airlines);
app.use('/api/airports', airports);
app.use('/api/search', search);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/** Error handlers
* Development error handler
* Will print the stacktrace, to get a hold where's the problem
*/
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

/** Error handlers
* Production error handler
* Just an error message and no stacktrace
*/
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
