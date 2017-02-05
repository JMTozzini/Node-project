const app = require('express')();
const bodyParser = require('body-parser');
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
	console.log('Call server GET projects ' + req.query.userId);
	mongoLib.getProjects(req.query.userId, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
