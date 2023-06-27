var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
var dotenv = require('dotenv')
var cors = require('cors');
var tokenHandler = require('./utils/tokenHandler')
dotenv.config()



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

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var postRouter = require('./routes/posts')
var convRouter = require('./routes/conversation')
var messRouter = require('./routes/message');
var userInfoRouter = require('./routes/userInfo')
const { addOnlineUser } = require('./socket/socket');

// verify token

app.use('/auth', authRouter)
app.use(function(req, res, next){
  const token = req.cookies.jwt
  if(!token){
    res.status(403).send("Token is missing")
    return
  }

  try {
    const userId = tokenHandler.verify(token)._id
    addOnlineUser(userId)
  } catch (error) {
    console.log(error)
    res.status(403).json(error)
    return
  }
  next()
})

app.use('/users', usersRouter);
app.use('/post', postRouter)
app.use('/conversation', convRouter)
app.use('/message', messRouter)
app.use('/userinfo', userInfoRouter)

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
