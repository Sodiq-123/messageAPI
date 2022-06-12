var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// Routes directory
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var messageRouter = require('./src/routes/messages');
var contactRouter = require('./src/routes/contacts');

var app = express();
var corsOption = {
	"origin" : "*",
};

module.exports = (app) => {
  app.use(cors(corsOption));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // Specify the routes
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/contact', contactRouter);
  app.use('/message', messageRouter);
  // catch 404 and forward to error handler
  app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint does not exist'
    })
  });
  return app;
}
