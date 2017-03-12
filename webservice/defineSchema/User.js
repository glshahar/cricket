var mongoose = require('mongoose');

var schema = mongoose.Schema;
var userSchema = new schema({
	email: String,
	password: String,
	gcmId: String,
	address: Number,
	products: []
}, {collection: 'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;
