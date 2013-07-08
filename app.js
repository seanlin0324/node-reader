
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , archive = require('./routes/archive')
  , reader = require('./routes/reader')
  , http = require('http')
  , path = require('path');

var parseCookie = require('connect').utils.parseCookie,
    MemoryStore = require('connect/lib/middleware/session/memory');

var storeMemory = new MemoryStore({
    reapInterval: 60000 * 10
});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({
    secret: 'OSSII Reader',
    store: storeMemory
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

//app.get('/zip', routes.zip);
app.get('/unzip', archive.unzip, reader.index );
app.get('/reader', reader.read );
app.post('/getData', reader.getData );
app.post('/file_upload',routes.home );
//app.get('/unzip', archive.unzip);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
