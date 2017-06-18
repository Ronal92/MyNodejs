var express = require('express');
var bodyParser = require('body-parser'); // post로 넘어온 body 값을 받기 위해 사용
var app = express();
app.locals.pretty=true;
app.set('view engine', 'jade'); 
app.set('views', './views_chat'); 
app.use(bodyParser.urlencoded({ extended: false })); // bodyparser가 req에 body값을 준다.
app.use(express.static('public'));


app.get('/chat/login', function (req, res){
	res.render('login');
});

app.get('/chat', function (req, res){
	res.sendfile('./views_chat/chat_layout.html');
});


app.listen(3001, function(){
	console.log('Server Listening 3001 port');
});