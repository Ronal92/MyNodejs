/**
Query 객체 사용해보기,
Semantic URL
*/

var express = require('express');
var app = express();
app.locals.pretty=true;
app.set('view engine', 'jade'); 
app.set('views', './views'); 
app.use(express.static('public'));


//app.get('/topics/:id', function (req, res){
 app.get('/topics', function (req, res){
	var topic = [
		'JavaScript',
		'NodeJs',
		'Web'
	];

	// var output = `
	// <a href="/topics/0">JavaScript</a><br>
	// <a href="/topics/1">NodeJs</a><br>
	// <a href="/topics/2">Web</a><br>
	// ${topic[req.params.id]}
	// `

	var output = `
	<a href="/topics?id=0">JavaScript</a><br>
	<a href="/topics?id=1">NodeJs</a><br>
	<a href="/topics?id=2">Web</a><br>
	${topic[req.query.id]}
	`
	res.send(output);
})


app.get('/template', function (req, res){
  res.render('temp',{time:Date(), _title:'Dok2'});
  				
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var list_dynamic = '';
for(var i = 0; i<5; i++){
	list_dynamic = list_dynamic + '<li>number'+i+'</li>';
}

app.get('/dynamic', function (req, res) {
	var data = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title></title>
		</head>
	<body>
		<ul>
			Hello, Dynamic!
			${list_dynamic}
		</ul>
	</body>	
	</html>`;

	res.send(data);
});

app.get('/route', function (req, res){
	res.send('<img src="/random.png">');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
