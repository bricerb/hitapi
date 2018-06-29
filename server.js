require('dotenv').config();
let app = require('express')();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
	console.log('HIT!');
	console.log(req.body);
	res.send({'message': 'Back at ya!'});
})

app.post('/', function(req, res) {
	var token = req.body.token;
	var cardNumber = req.body.card;
	var serial = req.body.serial;
	var uri = 'https://staging.otcnetwork.com/WebApi/GetMemberDetails';
	var opts = {
		uri: uri,
		method: 'post',
		headers: {
		  'Content-Type': 'application/json',
		  'Authorization': 'Bearer ' + token
		},
		json:true,
		body: {
			"cardNumber": cardNumber, 
		    "serialNumber": serial, 
		    "apiVersion" : "2.0", 
		    "mobileAppVersion": "1.0"
		}
	};

	request(opts, function( err, resp, body ) {
	if (err) {
	  // response.body = err;
	} else if (body != null) {
		console.log(body)
	  let balance = {'balance': body.cardBalance};
	  res.send(balance);
	  // response.continue();
	} else {
		res.send('NOPE');
	    // response.error("No balance remaining.");
	   }
	});
})

app.listen(app.get('port'), () => {
    console.log('Served onh', app.get('port'));
});