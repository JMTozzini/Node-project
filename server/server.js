const app = require('express')(),
			bodyParser = require('body-parser'),
			_ = require('lodash');

const mongoLib = require('./lib/mongo.js');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/create-project', function(req, res) {
	console.log('Call server POST create project ' + req.body.name);
	mongoLib.insertProject(req.body, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.get('/users', function(req, res) {
	console.log('Call server GET users');
	mongoLib.getUsers((err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.get('/user/:login', function(req, res) {
	console.log('Call server GET user ' + req.params.login);
	mongoLib.getUser(req.params.login, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.get('/userById/:id', function(req, res) {
	console.log('Call server GET user ' + req.params.id);
	mongoLib.getUserById(req.params.id, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.post('/user', function(req, res) {
	console.log('Call server POST create user ' + req.body.user);
	mongoLib.createUser(req.body.user, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.get('/projects', function(req, res) {
	console.log('Call server GET projects ' + req.query.userId || 'all' );
	mongoLib.getProjects(req.query.userId, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.get('/project/:projectId', function(req, res) {
	console.log('Call server GET project ' + req.params.projectId);
	mongoLib.getProject(req.params.projectId, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
