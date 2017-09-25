var express = require('express');
var router = express.Router();

var comments = {};

var html_encode = function(str){
	var s = '';
	if(str.length==0) return "";
	s = str.replace(/&/g,"&gt;");
	s = s.replace(/</g,"&lt;");
	s = s.replace(/>/g,"&gt;");
	s = s.replace(/\s/g,"&nbsp;");
	s = s.replace(/\'/g,"&#39;");
	s = s.replace(/\"/g,"&quot;");
	s = s.replace(/\n/g,"<br>");
	return s;
}
/* GET home page. */
router.get('/', function(req, res, next) {
	res.set('X-XSS-Protection',1);
  res.render('index', { title: 'Express',xss: req.query.xss});
});

router.get('/sendComment',function(req,res,next){
	// res.set('X-XSS-Protection',0);
	console.log('here');
	comments.v = html_encode(req.query.comment);
	res.json({
		status:200
	})
});

router.get('/getComment',function(req,res,next){
	res.json({
		comment:comments.v
	})
});

module.exports = router;
