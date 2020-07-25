var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('connect-flash');

// Database connection
require('dotenv').config();
require('./database/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// passport
const passport = require('passport');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: true,
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Handlebars helper
const hbs = require('./my_handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
    if (req.headers['content-type'] === 'application/json;') {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

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
    res.render('error', {
        layout: false,
        title: "404 Not Found",
        message: "Lỗi trang"
    });
});

module.exports = app;