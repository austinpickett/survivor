var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();

// Get game list route
router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	collection.find({timeOut:null},{},function(e,docs) {
		res.render('survivor/index', {
			"userlist": docs,
			title: "Survivor"
		});
	});
});

router.get('/start', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	collection.distinct("_id", {}, function(e, docs) {
		if (e) {
			res.send(e);
		} else {
			var userArray = docs;
			var immunityID = userArray[Math.floor(Math.random()*userArray.length)];
			collection.update({"_id": immunityID}, { $set: {immunity: true}}, function(e, docs) {
				if(e) {
					res.send(e);
				} else {
					collection.update({}, {$set: {timeOut: null}}, {multi: true}, function(e, docs) {
						if(e) {
							res.send(e);
						} else {
							res.redirect('/survivor/');
						}
					});
				}
			});
		}
	});
});

router.get('/vote', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');

	var voteID = [];

	collection.distinct("_id", {timeOut: null}, function(e, docs) {
		if (e) {
			res.send(e)
		} else {
			var userArray = docs;
			for (var i = 0; i < userArray.length; i++) {
				collection.update({"_id": userArray[i]}, {
					$set: {
						"vote": userArray[Math.floor(Math.random()*userArray.length)]
					}}, {multi: true}, function(e, docs) {
					if (e) {
						res.send(e);
					}
				});
			}				

		}
		res.redirect('/survivor/');
	});
});

module.exports = router;