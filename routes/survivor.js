var express = require('express');
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

	collection.update({}, {$set: {timeOut: null}}, {multi: true}, function(err, docs) {
		if(err) {
			res.send(err);
		} else {
			res.redirect('/survivor/');
		}
	});
});

module.exports = router;