var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/to_eatly_app");

module.exports.Food = require("./food.js");

