/**
POST, GET 통신
*/

var express = require('express');
var bodyParser = require('body-parser'); // post로 넘어온 body 값을 받기 위해 사용
var app = express();
app.locals.pretty=true;
app.set('view engine', 'jade'); 
app.set('views', './views'); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // bodyparser가 req에 body값을 준다.

app.get('/form', function (req, res){
	res.render('form');
});

app.get('/form_receiver', function (req, res){
	var title = req.params.title;
	var content = req.params.content;

	res.send(title+' ' + content);	
});

app.post('/form_receiver', function (req, res){
	var title = req.body.title;
	var content = req.body.content;

	res.send(title+', ' + content);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
