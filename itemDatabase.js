var itemList;
var currentItem;
var currentCategory
var myDatabase = function(){
	this.itemList = [];
	this.currentItem;
	this.currentCategory;
}
myDatabase.prototype.setCurrentItem = function(obj){//edited
	if(obj != null){
		console.log("I sent the current item to=" + obj);
		this.currentItem=obj;
		return true;
	}
	else
		return false;
}

myDatabase.prototype.getCurrentItem = function(){//edited
	if(this.currentItem != null || this.currentItem != undefined){
		console.log("this is what I want back=" + this.currentItem);
		return(this.currentItem);
	}
	else{
		return false;
	}
}

myDatabase.prototype.setCurrentCategory = function(obj){//edited
	if(obj != null){
		this.currentCategory=obj;
		return true;
	}
	else
		return false;
}

myDatabase.prototype.getCurrentCategory = function(){//edited
	if(this.currentCategory != null || this.currentCategory != undefined){
		return(this.currentCategory);
	}
	else{
		return false;
	}
}

myDatabase.prototype.checkCurrentItem = function(){//edited
	if(this.currentItem != null || this.currentItem != undefined){
		return(true);
	}
	else{
		return false;
	}
}

myDatabase.prototype.addItem = function(obj){//edited
	console.log("Inside add Item, name is " + obj.name);
	if(obj.name != null){
		for(let i=0;i<this.itemList.length;i++){
			if(obj.name == this.itemList[i].name){
				console.log("Please choose a unique name");
				return false;
			}
		}
		this.itemList.push({name:obj.name,price:obj.price,desc:obj.desc,img:obj.img,category:obj.category});
		console.log("Added item " + this.itemList[this.itemList.length-1].name);
		return true;
	}
	else
		return false;
}
myDatabase.prototype.getItem = function(obj){//edited
	console.log("IN get Item the name is =" + obj);
	// console.log(this.itemList);
	for(var i=0;i<this.itemList.length;i++){
		if(obj == this.itemList[i].name){
			return this.itemList[i];
		}
	}
	console.log("Get Item Failed");
	return false;
}
myDatabase.prototype.updateItem = function(obj){//edited
	for(let i=0;i<this.itemList.length;i++){
		if(obj.name == this.itemList[i].name){
			this.itemList[i]=obj;
			return true;
		}
		return false;
	}
}
myDatabase.prototype.deleteItem = function(obj){
	for(var k=0;k<this.itemList.length;k++){
		if(obj.name == this.itemList[k].name)
			this.itemList[k] = undefined;
	}
}
myDatabase.prototype.getAllItemNames = function(){
	var tmpList = [];
	var count = 0;
	for(var a=0;a<this.itemList.length;a++){
		if(this.itemList[a] != null)
		{
			var temp = this.itemList[a].name;
			tmpList[count] = temp;
			count++;
		}
	}
	return tmpList;
}

myDatabase.prototype.getAllItems = function(){
	return (this.itemList);
}

module.exports = myDatabase;
