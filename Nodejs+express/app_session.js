/**
	로그인시 session을 이용한다.
	코드는 not completed yet.
*/

var express = require('express');
var session = require('express-session');
var OrientoStore = require('connect-oriento')(session);
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
	secret: '1q2w3e4r5t',
	resave: false,
	saveUninitialized: true,
	store: new OrientoStore({
		server:'host=localhost&port=2424&username=root&password=111&db=o2'
	})
}));
//var OrientDB = require('orientjs');	
// var server = OrientDB({
//    host:       'localhost',
//    port:       2424,
//    username:   'root',
//    password:   '111'
// });
// var db = server.use({
// name: 'loginInform',
// username: 'root',
// password: '111'
// });

/*
	로그인 정보가 맞는지 DB에서 체크한다.
*/
app.post('/auth/login', function (req, res){
	var user = {
		username: 'egoing',
		password: '111',
		displayName: 'Egoing'
	};
	var uid = req.body.username;
	var upwd = req.body.password;

	var sql = "SELECT * FROM login where USERNAME=:id AND PASSWORD=:pwd";
	db.query(sql,{
		params:{
			id : uid,
			pwd : upwd
		}
	}).then(function (results){
			if(typeof results[0] == "undefined" || results[0]==null){
				console.log(results);
				res.redirect('/login/');
				
			} else {
				console.log('login');
			}
	});



});

/*
	로그인 페이지
*/
app.get('/login', function (req, res){
	var output= '';
	output = `
	<h1> Login Page</h1>
	<form action="/auth/login" method="post">
		<p> 
			<input type="text" name="username" placeholder="ID">
		</p>
		<p>
			<input type="text" name="password" placeholder="Password">
		</p>
		<p>
			<input type="submit">
		</p>
	</form>
	`;
	res.send(output);
});

app.get('/count', function (req, res){
	req.session.count = 1;
	res.send('PIcolo');
});

app.listen(3000, function(){
	console.log('Listening 3000 port');
});