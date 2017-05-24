/**
Express에서 정적파일 다루기

*/

var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/route', function (req, res){
	res.send('<img src="/random.png">');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
