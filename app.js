var restify = require('restify');
var mongoose = require('mongoose');
var Person = require('./models/person');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Lisa:Admin123@ds129720.mlab.com:29720/introtonode');

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
})

server.listen(process.env.PORT || 8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});

