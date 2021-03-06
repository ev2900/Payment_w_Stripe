// Dependencies
var express = require("express");
var stripe = require("stripe")("sk_test_45I1XnLpwQK20LbbF9A3GvwP");
var hbs = require("hbs");
var bodyParser = require("body-parser");

// App variable
var app = express();

// Hbs
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', function(req, res){
	res.render('index', {
	});
});

app.get('/paysuccess', function(req, res){
	res.render('paysuccess', {
	});
});

app.post('/charge', function(req, res){
	var token = req.body.stripeToken;
	var chargeAmount = req.body.chargeAmount;
	var charge = stripe.charges.create({
		amount: chargeAmount,
		currency: "usd",
		source: token 
	}, function(err, charge) {
		if(err) {
			console.log("Your card was declined");
		}
	});
	console.log("Your payment was successful");
	res.redirect('/paysuccess');
});
	

// Set port 
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('Server running on port ' + app.get('port'));
});