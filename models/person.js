var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Person = new Schema ({
	firstName: String,
	lastName: String
});

module.exports = mongoose.model('Person', Person);