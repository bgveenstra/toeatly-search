var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: {
    	type: String,
    	require: true
    },
    yumminess: {
    	type: String,
    	require: true
    }
});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;