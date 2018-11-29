var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var apisRouter = require('./routes/apis');

var app = express();

// view engine setup
//app.engine('html', require('ejs').renderFile)
//app.set('views', path.join(__dirname, '/front/build'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));*/
app.use(express.static(path.join(__dirname, './../front/dist')));

app.use('/', indexRouter);
app.use('/apis', apisRouter);

// URL 직접 주소 변경시 항상 index.html 보내 줌.
app.get('/*', (req,res) => {
    res.sendfile(path.join(__dirname, './../front/dist/index.html'))
})



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
  res.render('error');
});

module.exports = app;
