var fs = require('fs');
console.log("this is Async");
var data = fs.readFile('data.txt',{encoding:'utf8'}, function(err, data){
	console.log(data);
});

