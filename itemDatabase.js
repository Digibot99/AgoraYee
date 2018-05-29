var Item = require("./models/Item");
var mongoose = require("mongoose");

var myDatabase = function() {

}

myDatabase.prototype.addObj = function(obj, res) {
	console.log(obj);
	Item.create(obj, function(error, info) {
		if (error) {
			return res.json(null);
		} else {
			return res.json(obj);
		}
	});
}

myDatabase.prototype.searchItems = function(obj, res) {
	Item.find({}, function(error, info) {
		if (error) {
			return res.json(null);
		} else {
			let objs = [];
			for (let i = 0; i < info.length; i++) {
				var str = info[i].name;
				var str2 = obj;

				if (str.search(str2) > -1)
					objs.push(info[i]);


			}
			console.log("all items sent over " + objs);
			return res.json(objs);
		}
	});
}



myDatabase.prototype.getItem = function(obj, res) {
	Item.findOne({
		name: obj.name
	}, function(error, info) {
		if (error) {
			return res.json(null);
		} else {
			return res.json(info);
		}
	});
}

myDatabase.prototype.getAllItems = function(res) {
	Item.find({}, function(error, info) {
		if (error) {
			return res.json(null);
		} else {
			let objs = [];
			for (let i = 0; i < info.length; i++) {
				objs.push(info[i]);
			}
			return res.json(objs);
		}
	});
}

myDatabase.prototype.updateItem = function(obj, res) {
	Item.findOneAndUpdate({
		name: obj.name
	}, function(error, info) {
		if (error) {
			return res.json(null);
		} else {
			return res.json(obj);
		}
	});
}

module.exports = myDatabase;
