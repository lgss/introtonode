require('dotenv').config();
var restify = require('restify');
var mongoose = require('mongoose');
var Person = require('./models/person');
const DBUSER = process.env.DBUSER;
const DBPWD = process.env.DBPWD;
const DBLINK = process.env.DBLINK;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${DBUSER}:${DBPWD}@${DBLINK}`);

var server = restify.createServer();


server.use(restify.plugins.bodyParser());

server.get('/helloworld', function(req,res) {
	res.send(200,{message:'hello world'});
});

server.post('/helloworld', function(req, res) {
	res.send(200, {message:'Hello world post'});
});

server.get('/hello/:name', function(req,res) {
	res.send(200,{message:'hello ' +req.params.name});
});

server.post('/hello', function(req, res) {
	res.send(200, {message:'Hello world ' +req.body.name});
});

server.post('/person', function(req, res, next){
	var person = new Person();
	person.firstName = req.body.firstName; 
	person.lastName = req.body.lastName;

	person.save(function(err){
		if(err) res.send(400, {error: err.message});
		res.send(200,{id:person.id});
	})
});

server.get('/person/:id', function(req, res){
	Person.findById(req.params.id, function(err, person){
		if(err) res.send(400, {error: err.message});
			res.send(200, {person: person});
	})
});

server.get('/person', function(req, res) {
	Person.find({}, function(err, docs) {
		res.send(200, docs);
	})
});

server.get('/randomperson', function (req,res) {
	Person.findOne({}, function(err,doc) {

server.get('/findrandomperson', function (req,res) {
		// Get the count of all users
	Person.count().exec(function (err, count) {

	  // Get a random entry
		res.send(200,doc);
	})
});
	  var random = Math.floor(Math.random() * count)

	  // Again query all users but only fetch one offset by our random #
	  Person.findOne().skip(random).exec(
	    function (err, doc) {
	      // Tada! random user
	      res.send(200,doc);
	    })
	})
});


server.listen(process.env.PORT || 8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});

