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

app.listen(app.get('port'), () => {
    console.log('Served on', app.get('port'));
});