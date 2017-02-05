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

function get(query, collectionName, db, callback) {
	var collection = db.collection(collectionName);
	console.log(query);
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

function getUserById(userId, callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {_id: new ObjectId(userId)}, 'users')
	], callback)
}

function getProjects(userId, callback) {
	async.waterfall([
		connectDb,
		get.bind(null, {owner: userId}, 'projects')
	], callback)
}

module.exports = {
	insertProject,
	getProjects,
	createUser,
	getUser,
	getUserById
};
