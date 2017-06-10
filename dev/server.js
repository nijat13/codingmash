var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('../public'));

app.use('/', function (req, res) {
    res.sendFile(path.resolve('../public/index.html'));
});

var port = 9000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
