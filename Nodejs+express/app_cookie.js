/**
	웹 서버에서 쿠키를 다루는 법.
*/
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('1q2w3e4r5t')); // 쿠키를 암호화할 키값을 준다.

var products = {
	1:{title:'The Pirates of Caribian'},
	2:{title:'The Wind Blows'}
}

/*
	상품 리스트 보여주기
*/
app.get('/products', function (req,res){
	var output = '';
	for(var name in products){
		output +=`
			<li>
				<a href="/cart/${name}">${products[name].title}</a>
			</li>
		`
	}
	res.send(`<h1>Products</h><ul>${output}</ul><a href="/cart">Cart</a>`);	
});

/*
	사용자가 상품을 클릭하면 쿠키 생성, 증가
*/
app.get('/cart/:id', function (req, res){
	var id = req.params.id;
	if(req.cookies.cart){
		 cart = req.cookies.cart;
	} else {
		var cart = {};
	}
	if(!cart[id]){
		cart[id]= 0;
	}

	cart[id]= parseInt(cart[id]) + 1;
	res.cookie('cart', cart);
	res.redirect("/cart");

});

/*
	카트에 상품과 쿠키 보여주기
*/
app.get('/cart', function (req, res) {
	var cart = req.signedCookies.cart;
	if(!cart){
		res.rend('Empty');
	} else {
		var output = '';
		for(var id in cart){
			output +=`<li>${products[id].title} (${cart[id]})</li>`;
		}
	}
	res.send(`<ul>${output}</ul><form action='/products' method='get'><p><input type="submit" value="back"</p>`);
});

app.get('/count', function(req, res){
	res.cookie('count', 1);
	res.send('count ' + req.cookies.count);
});

app.listen(3000, function(){
	console.log('Listenning 3000 port');
});