var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// All page routes live in routes/index.js (assignment requirement)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// View engine setup: EJS templates are stored in /views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // needed to read the contact form
app.use(cookieParser());

// Static assets (CSS, JS, images) are served from /public,
// so "public" is not part of the URL: /stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to the error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Only show the error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
