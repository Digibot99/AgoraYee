const itemdatabase = require('./itemDatabase');
var IDB = new itemdatabase();
var myList;
var myDatabase = function(){
	this.myList = [];
}
myDatabase.prototype.addUser = function(obj){
	if(obj.name != null && obj.password != null)
		this.myList.push({name:obj.name , password:obj.password , itemBuyList:[] , itemSellList:[]});
	else
		return null;
}
myDatabase.prototype.getUser = function(obj){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && this.myList[i].password == obj.password){
			return this.myList[i];
		}
	}
	return false;
}
myDatabase.prototype.addUserItem = function(obj, item){
	let notInDB = false;
	IDB.addItem(item);
	let itemFull = IDB.getItem(item.name);
	// console.log(itemFull);
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && this.myList[i].password == obj.password){
			if(this.myList[i].itemBuyList.length < 1){
				notInDB = true;
			}
			else{
				for(let j=0;j<this.myList[i].itemBuyList.length;j++){
					if(this.myList[i].itemBuyList[j].name != itemFull.name){
						notInDB = true;
					}
					else{
						notInDB = false;
						break;
					}
				}
			}
			if(notInDB == true){
				this.myList[i].itemBuyList.push(itemFull);
				// console.log(this.myList[i].itemBuyList);
			}
		}
	}
	return notInDB;
}
myDatabase.prototype.getUserItems = function(obj){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name){
			return this.myList[i].itemBuyList;
		}
	}
}
myDatabase.prototype.addUserSellItem = function(obj, item){
	let notInDB = false;
	IDB.addItem(item);
	let itemFull = IDB.getItem(item.name);
	// console.log(itemFull);
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && this.myList[i].password == obj.password){
			if(this.myList[i].itemSellList.length < 1){
				notInDB = true;
			}
			else{
				for(let j=0;j<this.myList[i].itemSellList.length;j++){
					if(this.myList[i].itemSellList[j].name != itemFull.name){
						notInDB = true;
					}
					else{
						notInDB = false;
						break;
					}
				}
			}
			if(notInDB == true){
				this.myList[i].itemSellList.push(itemFull);
				console.log(this.myList[i].itemSellList);
			}
		}
	}
	return notInDB;
}
myDatabase.prototype.getUserSellItems = function(obj){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name){
			console.log("Sell Item List: " + this.myList[i].itemSellList);
			return this.myList[i].itemSellList;
			// for(let j=0;j<this.myList[i].itemSellList.length;j++){
			// 	console.log(this.myList[i].itemSellList);
			// 	console.log(j + ": " + IDB.getItem(this.myList[i].itemSellList[j].name));
			// }
		}
	}
	return 'hello';
}
myDatabase.prototype.updateUsername = function(obj, newUserName){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && obj.password == this.myList[i].password){
			this.myList[i].name = newUserName;
		}
	}
}
myDatabase.prototype.updateUserPassword = function(obj, newUserPassword){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && obj.password == this.myList[i].password){
			this.myList[i].password = newUserPassword;
		}
	}
}
myDatabase.prototype.deleteUser = function(obj){
	for(let i=0;i<this.myList.length;i++){
		if(obj.name == this.myList[i].name && obj.password == this.myList[i].password)
			this.myList[i] = undefined;
	}
}
myDatabase.prototype.getAllNames = function(){
	var tmpList = [];
	let count = 0;
	for(let i=0;i<this.myList.length;i++){
		if(this.myList[i] != null)
		{
			let temp = this.myList[i].name;
			tmpList[count] = temp;
			count++;
		}
	}
	return tmpList;
}

module.exports = myDatabase;
