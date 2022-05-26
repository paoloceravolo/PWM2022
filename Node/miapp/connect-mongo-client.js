const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const serveIndex = require('serve-index');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

let urlEncoded = bodyParser.urlencoded({extended: false});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var data = '';

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));
app.use('/images', serveIndex('public/images'));

app.use(session({
secret: "PWM2021",
resave: false,
saveUninitialized: false,
// secure: true require HTTPS, maxAge in milliseconds
cookie: {secure: false, maxAge: 3600000} 
}));

app.post('/login', urlEncoded, (req,res)=>{
	if(req.session.user_id){console.log("Utente " + req.session.user_id + " autenticato");}
	if(req.body.pass === 'admin'){
    	console.log("Utente " + req.body.user_id + " autenticato");
    req.session.user_id = req.body.user_id;
    }else{
    	console.log("Utente non autenticato");
    delete req.session.user_id
    }
    res.send("Ciao cookies "+JSON.stringify(req.session));
});

app.get('/cookies', function(req, res) {
if(req.session.page_views){
    console.log("Utente ha vistato la pagina " + req.session.page_views + " volte");
    req.session.page_views++;
    }else{
    req.session.page_views = 1;
    console.log("Prima volta che utente visita la pagina");
    //console.log(JSON.stringify(req.session))
    }
    res.send("Ciao cookies "+JSON.stringify(req.session));
});

axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
.then(res =>{
	data = res.data.title;
	console.log(res.data.title)
	console.log(res.data.explanation)
})
.catch(error => {
	console.log(error.message)
})


app.get('/', (req,res)=>{
	console.log('richiesta', req.method, req.url)
	res.render('index', {title: data, method: req.method, query: req.query});
});

app.post('/', function (req, res) {
    console.log("Ricevuta una richiesta POST per la homepage");
    res.send('Ciao POST !');
})

app.get('/citta/:name', function(req, res) { 
const nome = req.params.name; 
console.log("Ricevuta una richiesta per /centro %s",nome);
res.send('Centro universitario '+nome);
})

app.get('/uni*', function(req, res) {   
console.log("Ricevuta una richiesta per /uni*");
res.send('Cerchi una università?');
})


var server = app.listen(3000, ()=>{
	var host = server.address().address;
	var port = server.address().port;

	console.log(`Applicazione in ascolto su ${host} con porta ${port}`);
})