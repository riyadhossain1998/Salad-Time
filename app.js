var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
    response.render('main.html');
});

var port = process.env.PORT || 5000;
app.set('port', port);
app.listen(port, function() {
    console.log("Server running in %d",port);
});