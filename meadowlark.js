var express = require('express');

var app = express();

app.set('port',process.env.PORT || 3000);


var fortunes = [
		"Conquer your fears or they will conquer you.",
       	"Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple."
];

//view engine
app.set('view engine','jade');

app.get('/',function(req,res){
	res.render('home');
});

app.get('/about',function(req,res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about',{fortune:randomFortune});
});


//static file middleware
app.use(express.static(__dirname + '/public'));



// custom 404 page
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

// custom 505

app.use(function(err,req,res,next){
	console.log(err.stack);
	
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express start at http://localhost:' + app.get('port'));
});