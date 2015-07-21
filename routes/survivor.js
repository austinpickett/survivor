var express = require('express');
var router = express.Router();

// Get game list route
router.get('/', function(req, res) {
	var db = req.db;
	var gameCollection = db.get('gamecollection');

	gameCollection.find({"inProgress":true},{},function(e,docs) {
		res.render('survivor/index', {
			"gamelist": docs,
			title: "Survivor"
		});
	});
});

router.get('/start', function(req, res) {
	var db = req.db;
	var gameCollection = db.get('gamecollection');

	var userCollection = db.get('usercollection');
	userCollection.distinct("_id",{}, function(err,doc) {
		if (err) {
			res.send(err);
		} else {
			var userArray = doc;
			var immunityID = userArray[Math.floor(Math.random()*userArray.length)];
			gameCollection.insert({
				inProgress: true,
				immunityID: immunityID,
				usersList: userArray,
				winner: ""
			}, function(err, doc) {
				if(err) {
					res.send(err);
				} else {
					res.redirect('/survivor/');
				}
			});
		}
	});
});

module.exports = router;