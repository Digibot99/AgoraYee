var express = require("express");
var router = express.Router();
var path = require("path");
var clientSessions = require('client-sessions');
var formidable = require('formidable');
var fs = require('fs');
const itemdatabase = require('./itemDatabase');
/////user database things/////
const userdatabase = require('./userDatabase');


let DB = new userdatabase();
var itemDB = new itemdatabase();

var admin = DB.addUser({name:'admin' , password:'admin123'});
/////////database items///////////////edited
itemDB.addItem({name:"Xbox One X", price: 449.99, desc:"Latest Gaming console from Microsoft" , img: "/images/xBox.jpg",category:"electronics"});
itemDB.addItem({name:"PS4Pro", price: 349.99, desc:"Latest Gaming console from Sony" , img: "/images/PS4.jpg",category:"electronics"});
itemDB.addItem({name:"PlayerUnkowns Battlgrounds", price: 59.99, desc:"Hit batle royale game." , img: "/images/PUBGitem.jpg",category:"misc"});
itemDB.addItem({name:"Battlefield 1", price: 59.99, desc:"Militaristic shooter from DICE." , img: "/images/badgame.jpg",category:"misc"});
itemDB.addItem({name:"Bed", price: 49.99, desc:"Twin Size Bed." , img: "/images/bed.jpg",category:"misc"});
itemDB.addItem({name:"Dresser", price: 69.99, desc:"Large dresser." , img: "/images/dresser.jpg",category:"misc"});
itemDB.addItem({name:"Refrigerator", price: 124.99, desc:"Nice Refrigerator." , img: "/images/fridge.jpg",category:"electronics",category:"electronics"});
itemDB.addItem({name:"Stove", price: 224.99, desc:"Nice Stove with 4 burners on top." , img: "/images/stove.jpg",category:"electronics"});
itemDB.addItem({name:"Iphone X", price: 899.99, desc:"Latest phone from Apple." , img: "/images/iphonex.jpg",category:"electronics"});
itemDB.addItem({name:"Iphone X case", price: 20.99, desc:"Case for the Iphone X." , img: "/images/iphonexcase.jpg",category:"misc"});
itemDB.addItem({name:"Android Phone", price: 69.99, desc:"Phone from android." , img: "/images/androidphone.jpg",category:"electronics"});
itemDB.addItem({name:"Google Pixel 2", price: 99.99, desc:"Latest phone from google." , img: "/images/googlepixel2.jpg",category:"electronics"});
itemDB.addItem({name:"Bedding", price: 20.99, desc:"Cheap Bedding" , img: "/images/bedding.jpg",category:"misc"});
itemDB.addItem({name:"Football", price: 10.99, desc:"Football" , img: "/images/football.jpg",category:"sports"});
itemDB.addItem({name:"Soccer Ball", price: 10.99, desc:"Soccor Ball" , img: "/images/soccerball.jpg",category:"sports"});
itemDB.addItem({name:"Basket ball", price: 12.99, desc:"Basketball" , img: "/images/basketball.jpg",category:"sports"});
itemDB.addItem({name:"Baseball", price: 7.99, desc:"Baseball" , img: "/images/baseball.jpg",category:"sports"});
itemDB.addItem({name:"Baseball Bat", price: 30.99, desc:"wooden baseball bat" , img: "/images/baseballbat.jpg	",category:"sports"});
itemDB.addItem({name:"Helmet", price: 5.99, desc:"bike helmet" , img: "/images/bikehelmet.jpg",category:"misc"});
itemDB.addItem({name:"Panda", price: 5000.99, desc:"Its so fluffy" , img: "/images/panda.jpg",category:"animals"});
itemDB.addItem({name:"Pegasus", price: 99999.99, desc:"You can fly with it" , img: "/images/pegasus.jpg",category:"animals"});
itemDB.addItem({name:"Tiger", price: 200.99, desc:"Rawr ;)" , img: "/images/tiger.jpg",category:"animals"});
itemDB.addItem({name:"Dragon", price: 5000.99, desc:"Nice pet to have" , img: "/images/dragon.jpg",category:"animals"});
itemDB.addItem({name:"Dog", price: 5.99, desc:"Dont Bother" , img: "/images/dog.jpg",category:"animals"});
////////////////////////////////

router.get("/",function(request,response){
	request.session_state.reset();
	response.sendFile(__dirname + "/public/views/Home.html");
});

router.get("/list",function(request,response){
	if(request.session_state.username){
		response.sendFile(__dirname + "/public/views/ListUser.html");
	}
	else {
		response.sendFile(__dirname + "/public/views/List.html");
	}
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

router.get("/itemPage",function(request,response){
	response.sendFile(__dirname + "/public/views/itemPage.html");
});

router.get("/updateItem",function(request,response){
	response.sendFile(__dirname + "/public/views/updatingItem.html");
});

//fake submissions
// itemInfo.push({price:"5.00",name:"Pickaxe",desc:"Can go mining with it",img:"/images/waifu1.gif"});
// itemInfo.push({price:"3.00",name:"Shovel",desc:"Dig yourself a hole"});

//upload a fake set of data for presentation

router.post("/submitItem",function(req,res){//edited
	if(req.body.name == "" || req.body.price == "" || req.body.price <= 0 || req.body.desc == "")
		res.json(null);
	else{
		if(itemDB.addItem(req.body) == false){
			res.json(null);
		} else{
			res.json(req.body);
		}
	}

});

router.get("/getItemDB", function(req,res){
		res.json(itemDB.getAllItems());
});


router.post("/setCategory",function(req,res){//edited
	if(req.body.spec != null){
	itemDB.setCurrentCategory(req.body.spec);
	res.json(req.body.spec);
	}
	else
		res.json(null);
});

router.get("/getCategory",function(req,res){//edited
	res.json(itemDB.getCurrentCategory());
});

router.post("/updateItem",function(req,res){//edited
	if(req.body.name == "" || req.body.price == "" || req.body.price <= 0 || req.body.desc == "")
		res.json(null);
	else{
		itemDB.updateItem(req.body);
		res.json(req.body);
	}

});

router.get("/search",function(req,res){
	res.json(itemDB.getAllItems());
});

router.get("/getCurrentItemInfo",function(req,res){
	console.log("I want itemInfo of=" + itemDB.getCurrentItem());
	if(itemDB.getItem(itemDB.getCurrentItem()) == false)
		res.json(null);
	else{
		console.log("Im sending back= " + itemDB.getItem(itemDB.getCurrentItem()));
		res.json(itemDB.getItem(itemDB.getCurrentItem()));
	}
});

//changes the curent item clicked
router.post("/loadItem",function(req,res){//edited
	console.log("I set current Item=" + req.body.itemID);
	if(itemDB.setCurrentItem(req.body.itemID))
		res.json(itemDB.getCurrentItem());
	else
		res.json(null);
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


//////////////////////////////////////////////////////////login/signup/seesion methods////
let currentSessionPassWord;

router.get("/signup",function(req,res){
//add or modify.  Send back to the client signup.html.
	res.sendFile(__dirname + "/public/views/signup.html");
});

router.get("/account",function(req,res){
//add or modify.  Send back to the client signup.html.
	res.sendFile(__dirname + "/public/views/account.html");
});

router.get("/login",function(req,res){
//add or modify.  Send back to the client login.html.
res.sendFile(__dirname + "/public/views/login.html");
});

//add or modify.  Below is already done for you.
router.get("/logout",function(req,res){
	req.session_state.reset();
	res.json({redirect:"login"});
});


router.get("/session",function(req,res){
//add or modify.  Look at req.session_state.??? to check if a session is active.
//                If session is active then send back to the client session.html.
//                else send back to the client login.html.
  if(req.session_state.username){
		res.sendFile(__dirname + "/public/views/session.html");
  }
  else {
		res.sendFile(__dirname + "/public/views/login.html");
  }

});

router.get("/userInfo",function(req,res){
	console.log("I am in get userInfo");
	console.log(req.session_state.username);
	if(req.session_state.username != null)
		{
		console.log("I am in setting the name");
		res.json({name:req.session_state.username});
		}
		else {
			return(null);
		}

});

router.post('/signup', function(req, res){
//add or modify.  Check if a valid signup.  If the signup is valid,
//                  add user and password info to userInfo array.
//                  Give req.session_state.??? a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.
 let obj = {name: req.body.userName , password: req.body.password};
  if(req.body.password == "" || DB.getUser(obj)){
    res.json(null);
  }
  else if(!DB.getUser(obj))
  {
    DB.addUser(obj);
    console.log("Added " + obj.name);
    req.session_state.username = obj.name;
		currentSessionPassWord = obj.password;
    res.json({redirect:"session"});
  }

});



router.post('/login', function(req, res){
//add or modify.  Determine if the login info is valid.  If the login is valid,
//                  set req.session_state.??? to a valid value.
//                  Send back a json object of {redirect:"/session"}.
//                else send back a json object that is null.
let obj = {name: req.body.userName , password: req.body.password};
 if(req.body.password == "" || DB.getUser(obj) == false){
   res.json(null);
 }
 else
 {
   console.log("Logged in as " + obj.name);
   req.session_state.username = obj.name;
	 currentSessionPassWord = obj.password;
   res.json({redirect:"/session"});
 }
});

/////////////////////////////////USERBUYITEM////////////////////////////////////

router.post('/addUserItem', function(req, res){
	if(req.session_state.username)
	{
		console.log("Inside addUserItem");
		let user = {name: req.session_state.username, password: currentSessionPassWord};
		let item = {name: req.body.name , price: req.body.price,desc:req.body.desc,img:req.body.img,category:req.body.category};
		let returnValue = DB.addUserItem(user, item);
		console.log(returnValue);
		res.json(returnValue);
	}
	else {
		res.json(undefined);
	}
});

router.get('/getUserItemList', function(req, res){
	console.log("Inside getUserItemList");
	let obj = {name: req.session_state.username};
	console.log(obj);
	console.log(obj.name);
	let tempObj = DB.getUserItems(obj);
	console.log(tempObj);
	res.json(tempObj);
});

/////////////////////////////////USERSELLITEM///////////////////////////////////

router.post('/addUserSellItem', function(req, res){
	if(req.session_state.username)
	{
		console.log("Inside addUserSellItem");
		let user = {name: req.session_state.username, password: currentSessionPassWord};
		let item = {name: req.body.name , price: req.body.price,desc:req.body.desc,img:req.body.img,category:req.body.category};
		itemDB.addItem(item);
		let returnValue = DB.addUserSellItem(user, item);
		console.log(returnValue);
		res.json(returnValue);
	}
	else {
		res.json(undefined);
	}
});

router.get('/getUserSellItemList', function(req, res){
	console.log("Inside getUserItemSellList");
	let obj = {name: req.session_state.username};
	console.log(obj);
	console.log(obj.name);
	let tempObj = DB.getUserSellItems(obj);
	console.log(tempObj);
	res.json(tempObj);
});

module.exports = router;
