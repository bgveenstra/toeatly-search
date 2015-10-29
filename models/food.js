var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
    name: String,
    yumminess: String
});

var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;