 var mongoose = require("mongoose");

 var sellSchema = mongoose.Schema({
   name: {
     required: true,
     type: String
   },
   user: {
     required: true,
     type: String
   },
   price: Number,
   desc: String,
   img: String
 });

 var Sell = mongoose.model("Sell", sellSchema);



 module.exports = Sell;
