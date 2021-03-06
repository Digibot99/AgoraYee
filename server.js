var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");

var setUpPassport = require("./setuppassport");
var routes = require("./routes");

var app = express();
mongoose.connect("mongodb://everyone:everyone@ds016298.mlab.com:16298/datab");
setUpPassport();

app.set("port", process.env.PORT || 4000);

app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use('/CSS', express.static('./public/CSS'));
app.use('/images', express.static('./public/images'));
app.use('/views', express.static('./public/views'));


app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: "hbaifbpisadyfbisudfbiosydhfbpiaunfdpxjinfdkvjxnclbefioua~{so~jnc~pu~bPubpsidfUN]POJH329-E8 Yhq[doinawpdfu]}",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
