// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    session = require("express-session");


var db = require('./models');

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files in a fake 'static' directory
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
// configure session

// ROUTES //
app.get("/", function (req, res){
  db.Food.find().exec(function(err, foods){
     if (err) { return console.log("find error: " + err); }
  	  // render index view and send with foods data filled in
     res.render("index", {foods: foods});
  });
});

// json api route to get all foods (sanity check)
app.get("/api/foods", function (req, res){
 // get all foods from db
 db.Food.find(function(err, foods){
    res.send(foods);
  });
});

// search route
app.post("/search", function (req, res){
	console.log('search term is ', req.body.searchName);
	db.Food.find({name: req.body.searchName}, function(err, foundFoods){
		if (err) { return console.log("find error in search: " + err); }
		// console.log(foundFoods);
		res.json(foundFoods);
	});
});

// api route to create new food
app.post("/api/foods", function (req, res){
  var newFood = req.body;
   console.log(newFood);
   // newFood is an object, for example
   // { name: "apple", yumminess: "good, and good for you!" }
  db.Food.create(newFood, function(err, food){
    if (err) { return console.log("create error: " + err); }
    console.log("created ", food.name, food.yumminess);
    res.json(food);
	});
});

// api route to delete a food
app.delete("/api/foods/:id", function (req, res){
  // set the value of the id
  var targetId = req.params.id;

  console.log(targetId); // @TODO TO FIX: Currently returns Null, NaN or undefined...

  db.Food.findOneAndRemove({_id:targetId}, function(err, deletedFood){
    if (err) { return console.log("delete error: " + err); }
    console.log(deletedFood + " removed");
    res.send(deletedFood);
   });
});

app.listen(3000, function (){
  console.log("listening on port 3000");
});