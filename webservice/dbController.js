var mongoose = require('mongoose');

// Schemes / Collections
var Product = require('./defineSchema/Product');
var User = require('./defineSchema/User');
var email = "";

// Check Login By Email (unique) + Pass
exports.checkLogin = function(req, res){
	email = req.body.email;
	var password = req.body.password;
	console.log("Checking Login.. "+email+" "+password+"");

	var query = User.findOne({}).where('email').equals(email). 
								 where('password').equals(password).
								 exec (function(err, user){
	if(err){
		console.log(err);
		return res.status(500).send();
	}
	if(!user){
		console.log("Email / Password Incorrect");
		return res.status(404).send();
	}
	console.log("Connected Successfully");
	return res.status(200).send(user);
	})
};

// Get Products By Email (unique) + Pass
exports.getProdByUser = function(req, res){
	console.log("Get Products By Email: "+email+"");

	var query = User.find({}).where('email').equals(email). 
								 exec (function(err, prod){
	if(err){
		console.log(err);
		return res.status(500).send();
	}
	if(!prod){
		console.log("No Products were found");
		return res.status(404).send();
	}
	console.log("Products displayed");
	return res.status(200).send(prod);
	})
};