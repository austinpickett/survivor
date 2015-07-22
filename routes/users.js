var express = require('express');
var router = express.Router();

// Get user list route
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	collection.find({},{},function(e,docs) {
		res.render('users/index', {
			"userlist": docs
		});
	});
});

// Get new user route
router.get('/add', function(req, res) {
	res.render('users/new', { title: 'Add New User'});
});

/* POST to add user */
router.post('/add', function(req, res) {
	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		username: userName,
		email: userEmail,
		immunity: false,
		timeOut: null,
		vote: null
	}, function(err, doc) {
		if (err) {
			res.send("There was a problem adding the data: " +err);
		} else {
			res.redirect("/users/");
		}
	});
});

// get view user route
router.get('/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	var userId = req.params.id;

	collection.find({"_id":userId},{},function(e,docs) {
		res.render('users/show', {
			userId: userId,
			username: docs[0].username,
			email: docs[0].email,
			immunity: docs[0].immunity
		});
	});
});

// Get delete user route
router.get('/delete/:id', function(req, res) {
	var db = req.db
	var collection = db.get('usercollection');

	var userId = req.params.id;

	collection.remove({
		_id: userId
	}, function(err){
		if (err) {
			res.send(err);
		} else {
			res.redirect('/users/')
		}
	});
});

// GET edit the user
router.get('/edit/:id', function(req, res) {
	var db = req.db
	var collection = db.get('usercollection');

	var userId = req.params.id;

	collection.find({_id:userId},{},function(e,docs) {
		res.render('users/edit', {
			"edituser": docs,
			title: "Edit " + docs[0].username
		});
		console.log(docs[0].username);
	});
});

// POST Edit the user
router.post('/edit/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	var userId = req.params.id;

	collection.update({
		_id: userId,
	}, {
		username: req.body.username,
		email: req.body.useremail,
		immunity: req.body.userimmunity,
		timeOut: req.body.usertimeout
	}, function(err) {
		if (err) {
			res.send("There was an error");
		} else {
			res.redirect('/users/');
		}
	});
});

module.exports = router;
