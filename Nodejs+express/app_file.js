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
app.set('views', './views_folder');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false })); // bodyparser가 req에 body값을 준다.

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
	파일 생성하는 form을 제공한다.
*/
app.get('/topic/new', function (req, res){
	
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new-dev', {topics:files}); // files를 topics에 담아서 전송!

	});
});

/*
	첫 화면
*/
app.get(['/topic', '/topic/:id'], function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		var id = req.params.id;

		if(id){
			fs.readFile('data/'+id, 'utf8', function(err, data){
				if(err){
					console.log(err);
					res.status(500).send('Internal Server Error');			
				}
				res.render('view', {topics:files, title:id, content:data});
			});
		} else {
			res.render('view', {topics:files, title:'Welcome', content:'OnGoing'}); // files를 topics에 담아서 전송!
		}
	});
});

/*
	파일이 생성되는 곳
*/
app.post('/topic', function (req, res){
	var title = req.body.title;
	var content = req.body.content;

	fs.writeFile('data/'+title, content, function(err){
		if(err){
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/'+title);
	});
});

app.listen(3000, function(){
	console.log("Server is working");
});