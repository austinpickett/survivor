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
	collection.distinct("_id",{}, function(e,docs) {
		if (e) {
			res.send(err);
		} else {
			var userArray = docs;
			for (var i = 0; i<userArray.length; i++) {
				collection.update({
					"_id": userArray[i]
				}, {
					$set:
					{timeOut: null}
				}, function(err, docs) {
					if(err) {
						res.send(err);
					} else {
						res.redirect('/survivor/');
					}
				});
			}
		}
	});
});

module.exports = router;