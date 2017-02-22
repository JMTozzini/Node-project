const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const async = require('async');

function connectDb(callback) {
	MongoClient.connect('mongodb://localhost:27017/node-project', (err, database) => {
		if (err) {
			return callback(err);
		}
		db = database;
		callback(null, db);
	});
}

function insert(data, collectionName, db, callback) {
	var collection = db.collection(collectionName);
	collection.insert(data, (err, result) => {
		if(err) {
			return callback(err);
		}
		callback(null, result);
	});
}

function update(query, data, collectionName, db, callback) {
	var collection = db.collection(collectionName);
	collection.update(query, data, (err, result) => {
		if(err) {
			return callback(err);
		}
		callback(null, result);
	});
}

function get(query, collectionName, db, callback) {
	var collection = db.collection(collectionName);
	collection.find(query)
		.toArray((err, result) => {
			if(err) {
				return callback(err);
			}
			callback(null, result);
	});
}

function insertProject(project, callback) {
	async.waterfall([
		connectDb,
		insert.bind(null, project, 'projects')
	], callback)
}

function addMessage(msg, callback) {
	async.waterfall([
		connectDb,
		update.bind(null, {_id: new ObjectId(msg.project._id)}, {$push: {messages: {msg: msg.msg, sender: msg.sender, date: msg.date}}}, 'projects')
	], callback)
}

function createUser(user, callback) {
	async.waterfall([
		connectDb,
		insert.bind(null, user, 'users')
	], callback)
}

function getUser(login, callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {login}, 'users')
	], callback)
}

function getUsers(callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {}, 'users')
	], callback)
}

function getUserById(userId, callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {_id: new ObjectId(userId)}, 'users')
	], callback)
}

function getProjects(userId, callback) {
	var query = userId ? {owner: userId} : {}
	async.waterfall([
		connectDb,
		get.bind(null, query, 'projects')
	], callback)
}

function getProject(projectId, callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {_id: new ObjectId(projectId)}, 'projects')
	], callback)
}

function updateProject(projectId, data, callback) {
	async.waterfall([
		connectDb,
		update.bind(null, {_id: new ObjectId(projectId)}, data, 'projects')
	], callback)
}

module.exports = {
	insertProject,
	getProjects,
	getProject,
	updateProject,
	createUser,
	getUsers,
	getUser,
	addMessage
};
