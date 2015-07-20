var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('survivor/index', { title: 'Survivor'});
});

module.exports = router;
