var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/dynamic', function (req, res) {
	var data = `
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title></title>
		</head>
	<body>
		Hello, Dynamic!
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
