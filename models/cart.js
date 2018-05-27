

var mongoose = require("mongoose");

var cartSchema = mongoose.Schema({
	name: {
		required: true,
		type:String
	},
	user: {
		required: true,
		type: String
	}
});

var Cart = mongoose.model("Cart", cartSchema);



module.exports = Cart;
