var Cart = require("./models/cart");
var mongoose = require("mongoose");

var myDatabase = function(){

}

myDatabase.prototype.addObj = function(obj,res){
	console.log(obj);
	Cart.create(obj, function(error,info){
		if(error){
			return res.json(null);
		} else {
			return res.json(obj);
		}
	});
}

myDatabase.prototype.getItem = function(obj,res){
	Cart.findOne({_id:obj.id},function(error,info){
		if(error){
			return res.json(null);
		} else{
			return res.json(info);
		}
	});
}

myDatabase.prototype.getAllItems = function(res){
	Cart.find({}, function(error,info){
		if(error){
			return res.json(null);
		} else {
			let objs = [];
			for (let i=0;i<info.length;i++){
				objs.push(info[i]);
			}
			return res.json(objs);
		}
	});
}

myDatabase.prototype.updateItem = function(obj,res){
	Cart.findOneAndUpdate({name:obj.name},function(error,info){
		if(error){
			return res.json(null);
		} else{
			return res.json(obj);
		}
	});
}

module.exports = myDatabase;
