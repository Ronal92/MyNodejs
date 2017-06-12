/**
	파일이 아닌 데이터베이스(OrientDB)를 이용해서
	웹 애플리케이션에서 추가와 수정을 구현한다.
	
	

*/


var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // 파일 업로드를 위한 모듈
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: _storage }); // 사용자가 올린 파일을 저장할 디렉토리
var fs = require('fs');
var app = express();  // express()은 애플리케이션 객체를 리턴한다.
app.set('views', './views_orientdb');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false })); // bodyparser가 req에 body값을 준다.
app.locals.pretty = true;		
var OrientDB = require('orientjs');
var server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   '111'
});
var db = server.use({
name: 'o2',
username: 'root',
password: '111'
});

/*
	사용자가 /user/sample1.png를 누르면 해당 사진을 uploads에서 가져와서 보여준다.
*/
app.use('/user', express.static('uploads'))
/*
	파일을 업로드하는 곳
*/
app.get('/upload', function (req, res) {
	res.render('uploadForm');
});
/*
	전송된 파일을 /upload 디렉토리에 저장하는 곳
*/
app.post('/upload', upload.single('userfile'), function (req, res){
	console.log(req.file);
	res.send('Upload');
});


/*
	각 토픽에 대한 정보를 가져온다.
*/
app.get('/topic/add', function (req, res){
	var sql = 'SELECT * FROM topic';
	db.query(sql).then(function(results){
		res.render('add', {topics:results}); // files를 topics에 담아서 전송!
	});
});

/*
	topic을 추가하는 곳
*/
app.post('/topic/add', function (req, res){
	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.author;
	var sql = "INSERT INTO topic (title, description, author) VALUES(:title, :description, :author)";

	db.query(sql, {
		params:{
			title:title,
			description:description,
			author:author
		}
	}).then(function(results){
		res.redirect('/topic/' + encodeURIComponent(results[0]['@rid']));
	})

});

/*
	각 토픽 정보를 수정한다.
*/
app.get('/topic/:id/edit', function (req, res){
	console.log(":id/edit");
	var sql = 'SELECT * FROM topic';
	var id = req.params.id;
	db.query(sql).then(function(results){
		var sql = 'SELECT FROM topic WHERE @rid=:rid';
		db.query(sql, {params:{rid:id}}).then(function(topic){
		res.render('edit', {topics:results, topic:topic[0]});
		});
	});
});

/*
	각 토픽 정보를 수정하는 곳
*/
app.post('/topic/:id/add', function (req, res){
	var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid';
	var id = req.params.id;
	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.author;
	db.query(sql,{
		params:{
			t:title,
			d:description,
			a:author
		}
	}).then(function(results){
		res.redirect('/topic/'+encodeURIComponent(id));
	});
});

/*
	첫 화면
*/
app.get(['/topic', '/topic/:id'], function (req, res){
	var sql = 'SELECT * FROM topic';
	db.query(sql).then(function(results){
		var sql = 'SELECT FROM topic WHERE @rid=:rid';
		var id = req.params.id;
		if(id){
			db.query(sql, {params:{rid:id}}).then(function(topic){
			res.render('view', {topics:results, topic:topic[0]});
			});
		} else {
			res.render('view', {topics:results});
		}

	});
});







app.listen(3000, function(){
	console.log("Server is working");
});