var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
var dotenv = require('dotenv')
var cors = require('cors');
var tokenHandler = require('./utils/tokenHandler')
var connectDB = require("./database")

dotenv.config()
connectDB()



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())


// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

// Routing
var router = require('./routes')


// verify token

app.use('/auth', router.authRouter)
app.use(tokenHandler.verifyUser)

app.use('/users', router.userRouter);
app.use('/post', router.postRouter)
app.use('/conversation', router.conversationRouter)
app.use('/message', router.messageRouter)
app.use('/userinfo', router.userInfoRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
