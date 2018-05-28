var Sell = require("./models/sell");
var mongoose = require("mongoose");

var myDatabase = function(){

}

myDatabase.prototype.addObj = function(obj,res){
	console.log("Inside SellDB.addobj");
	console.log(obj);
	Sell.create(obj, function(error,info){
		if(error){
			return res.json(null);
		} else {
			return res.json(obj);
		}
	});
}

myDatabase.prototype.getItem = function(obj,res){
	Sell.findOne({user:obj.user},function(error,info){
		if(error){
			return res.json(null);
		} else{
			return res.json(info);
		}
	});
}

myDatabase.prototype.getAllItemsofUser = function(obj,res){
	console.log(obj);
	Sell.find({user:obj.user}, function(error,info){
		if(error){
			return res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++){
				objs.push(info[i]);
			}
			console.log("ppppp " + objs);
			return res.json(objs);
		}
	});
}

myDatabase.prototype.updateItem = function(obj,res){
	Sell.findOneAndUpdate({name:obj.name},function(error,info){
		if(error){
			return res.json(null);
		} else{
			return res.json(obj);
		}
	});
}

module.exports = myDatabase;
