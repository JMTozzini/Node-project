const app = require('express')(),
			http = require('http').Server(app),
			io = require('socket.io')(http),
			bodyParser = require('body-parser'),
			_ = require('lodash');

const mongoLib = require('./lib/mongo.js');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
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

app.put('/userById/:id', function(req, res) {
	console.log('Call server PUT user by id ' + req.params.id);
	mongoLib.updateProfile(req.params.id, _.omit(req.body.user, ['_id']), (err, data) => {
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


app.put('/project/:projectId', function(req, res) {
	console.log('Call server PUT project ' + req.params.projectId);
	mongoLib.updateProject(req.params.projectId, _.omit(req.body, ['_id']), (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.delete('/project/:projectId', function(req, res) {
	console.log('Call server DELETE project ' + req.params.projectId);
	mongoLib.deleteProject(req.params.projectId, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

app.post('/project/:projectId/participants', function(req, res) {
	console.log('Call server POST project participants' + req.params.projectId + ' ' + req.query.userId);
	mongoLib.joinProject(req.params.projectId, req.query.userId, (err, data) => {
		if (err) {
			return console.error(err);
		}
		res.send(data);
	});
});

io.on('connection', function(socket){
  console.log('a user connected');
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	socket.on('chat message', function(msg) {
		mongoLib.addMessage(msg, (err, data) => {
			if (err) {
				return console.error(err);
			}
	    io.emit('chat message', msg);
		});
  });
});

http.listen(3000, () => {
  console.log('listening on 3000');
});
