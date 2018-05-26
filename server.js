var express = require('express');
var bodyParser = require('body-parser');
var clientSessions = require('client-sessions');

var routes = require("./routes");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use('/CSS', express.static('./public/CSS'));
app.use('/images', express.static('./public/images'));
app.use('/views', express.static('./public/views'));


app.use(clientSessions({
  secret: 'here is a text string' // CHANGE THIS!
}));

app.use(routes);

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
})
