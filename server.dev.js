var path = require('path')
  , fallback = require('express-history-api-fallback')
  , express = require('express')
  , root = path.join( __dirname + '/dist/');

var app = express();
app.use( express.static(root) );
app.use( fallback('index.html', {root: root}));
var port = 8000;
app.listen(port, '127.0.0.1', function(){
  console.log( 'listening on 127.0.0.1:8000' );
});