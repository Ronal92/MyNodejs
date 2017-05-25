/**
정적 vs 동적
정적 : static으로 만든 디렉토리 하위에 필요한 html을 만들면 따로 node를 재실행시키 않아도 바로 볼수 있다.
동적 : html을 따로 .js파일에 넣은다음 프로그래밍적으로 제어할 수 있다. 다만 node를 재실행시켜야 한다.
*/

var express = require('express');
var app = express();

app.use(express.static('public'));
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
