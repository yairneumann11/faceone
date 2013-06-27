
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/')
  , user = require('./routes/user')
  , http = require('http')
  , fs = require('fs')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

var _ = require('underscore');

app.engine('html', require('ejs').renderFile);


app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get('/', routes.index);
app.post('/', function(req,res){

    var output =     {
        "name":req.body.name,
        "photo_data":req.body.photo_data,
        "qoute":req.body.qoute
    }



    var source = fs.readFile(__dirname + '/public/db/photos_db.js','utf8',function(err,data){
        data = JSON.parse(data);

        data.push(output)
        console.log(output);
        data = JSON.stringify(data);
        fs.writeFile(__dirname + '/public/db/photos_db.js',data,function(err){
            console.log(err)
        })
    });
    res.send({
        "check":"true"
    });
    //res.writeHead(200);
      //  console.log(output);
    res.end();
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
