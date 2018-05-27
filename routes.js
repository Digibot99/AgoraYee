var express = require("express");
var passport = require("passport");
var path = require("path");

var User = require("./models/user");
var router = express.Router();
var mongoose = require("mongoose");


var formidable = require('formidable');
var fs = require('fs');
const itemdatabase = require('./itemDatabase');
const cartdatabase = require('./cartDatabase');
var itemDB = new itemdatabase();
var cartDB = new cartdatabase();

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

let currCatg;
let currSearch;
let searchedSomething;

router.get("/list2/:catg",function(request,response){
	currSearch = request.params.catg;
	searchedSomething = true;
	console.log("This is = " + currSearch);
		response.sendFile(__dirname + "/public/views/List.html");
});


router.get("/list/:catg",function(request,response){
	currCatg = request.params.catg;
	// console.log("This is = " + currCatg);
		response.sendFile(__dirname + "/public/views/List.html");
});

router.get("/cartList",function(request,response){
	response.sendFile(__dirname + "/public/views/cartList.html");
});

router.get("/sellList",function(request,response){
	response.sendFile(__dirname + "/public/views/sellList.html");
});

router.get("/addItem",function(request,response){
	response.sendFile(__dirname + "/public/views/addingItem.html");
});

let currItem;
router.get("/itemPage/:name",function(request,response){
	currItem = request.params.name;
	response.sendFile(__dirname + "/public/views/itemPage.html");
});

router.get("/updateItem",function(request,response){
	response.sendFile(__dirname + "/public/views/updatingItem.html");
});
router.get("/account",function(request,response){
	response.sendFile(__dirname + "/public/views/account.html");
});


router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});
});

router.get("/successlogin", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});

});



router.get("/", function(req, res, next) {
console.log("get root");
	let thePath = path.resolve(__dirname,"public/views/Home.html");
	res.sendFile(thePath);

 // User.find()
 // .sort({ createdAt: "descending" })
 // .exec(function(err, users) {
 //   if (err) { return next(err); }
 //   res.render("index", { users: users });
 // });
});


router.get("/signup", function(req, res) {
console.log("get signup");

	let thePath = path.resolve(__dirname,"public/views/signup.html");
	res.sendFile(thePath);

});

router.get("/login", function(req, res) {
console.log("get login");

	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

});


router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
	let thePath = path.resolve(__dirname,"public/views/Home.html");
	res.sendFile(thePath);
  } else {
  	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);
  }
});

router.get("/userInfo",function(req,res){
     if (req.isAuthenticated()) {
		res.json({username:req.user.username});
	}
	else {
		res.json(null);
	}
});




router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("post signup1");

    var newUser = new User({
      username: username,
      password: password,
      cartItems: []
    });
console.log("post signup2");

    newUser.save(next);    //this line has to be called.
console.log("post signup done");

  });


}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));




router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

///////////////////////////////////itemDatabase interaction

router.post("/submitItem",function(req,res){//edited
	if(req.body.name == "" || req.body.price == "" || req.body.price <= 0 || req.body.desc == "")
		res.json(null);
	else{
		return (itemDB.addObj(req.body,res));
	}

});

router.get("/searchName", function(req,res){
		return(itemDB.getItem({name:currItem},res));
});

router.get("/getItemDB", function(req,res){
		return(itemDB.getAllItems(res));
});

router.get("/getItemDB/:search", function(req,res){
		return(itemDB.searchItems(req.params.search,res));
});

router.get("/getifSearched",function(req,res){//edited
	if(searchedSomething === true){
		searchedSomething = false;
		res.json({search:true, csearch:currSearch});
	}else {
		res.json({search:false, csearch:currSearch});
	}
});


router.get("/getCategory",function(req,res){//edited
	res.json({category:currCatg});
});

router.post("/updateItem",function(req,res){//edited
	if(req.body.name == "" || req.body.price == "" || req.body.price <= 0 || req.body.desc == "")
		res.json(null);
	else{
		itemDB.updateItem(req.body,res);
		res.json(req.body);
	}

});

router.get("/search",function(req,res){
	return(itemDB.getAllItems(res));
});


router.get("/loadItemPage",function(req,res){//edited
	var itemInfo = itemDB.getAllItems();
	// console.log(itemInfo);
	if(itemDB.checkCurrentItem()){
		console.log("current Item does exist");
		console.log("current Item does exist=" + itemDB.getCurrentItem());
		for(var i=0;i<itemInfo.length;i++){
			if((itemInfo[i] != null || itemInfo[i] != undefined) && itemInfo[i].name === itemDB.getCurrentItem()){
				console.log("I got the proper item=");
				console.log("This is the item I want=" + itemInfo[i].name);
				res.json({name:itemInfo[i].name,price:itemInfo[i].price,desc:itemInfo[i].desc,img: itemInfo[i].img});
				break;
			}
		}
	}
	else {
		console.log("currentItem didnt exist");
		res.json(null);
	}
});

///Upload images
router.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = __dirname + '/public/images/' + files.filetoupload.name;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;

		res.redirect("/addItem");
      });
    });
});

/////////////////////////////////USERBUYITEM////////////////////////////////////

router.post('/addUserItem', function(req, res){
	if(req.isAuthenticated())
	{
		console.log("Inside addUserItem");
    if(req.body.name == "")
  		res.json(null);
  	else{
      var a = {name:req.body,user:req.user.username};
  		return (itemDB.addObj(a,res));
  	}
	}
	else {
		res.json(undefined);
	}
});

router.get('/getUserItemList', function(req, res){
	console.log("Inside getUserItemList");
  var itemList = [];
  for(let i=0; i< req.user.cartItem.length;i++){
    itemList.push(req.user.cartItem[i]);
  }
  console.log(itemList);
	res.json(req.user.cartItem);
});

/////////////////////////////////USERSELLITEM///////////////////////////////////

router.post('/addUserSellItem', function(req, res){
	if(req.isAuthenticated())
	{
		console.log("Inside addUserSellItem");
		let item = {name: req.body.name , price: req.body.price,desc:req.body.desc,img:req.body.img,category:req.body.category};
		itemDB.addItem(item);
		// let returnValue = DB.addUserSellItem(user, item);
		// console.log(returnValue);
		res.json(item);
	}
	else {
		res.json(undefined);
	}
});

router.get('/getUserSellItemList', function(req, res){
	console.log("Inside getUserItemSellList");
	res.json(req.user.sellItems);
});







module.exports = router;
