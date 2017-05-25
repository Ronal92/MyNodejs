/**
*/

var express = require('express');
var app = express();
app.locals.pretty=true;
app.set('view engine', 'jade'); // express와 template engine을 연결한다.
app.set('views', './views'); // 템플릿 파일이 있는 디렉토리
app.use(express.static('public'));

/*
특정 template을 사용하기 위한 함수
*/
app.get('/template', function (req, res){
  res.render('temp',{time:Date(), _title:'Dok2'});
  					// 객체를 정의하여 전달할 값을 넘긴다.
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
