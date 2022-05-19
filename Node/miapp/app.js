const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const serveIndex = require('serve-index');

const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));
app.use('/images', serveIndex('public/images'));

app.get('/', (req,res)=>{
	res.send('Hello World');
});

app.post('/', function (req, res) {
    console.log("Ricevuta una richiesta POST per la homepage");
    res.send('Ciao POST !');
})

app.get('/centro/:nome', function(req, res) { 
const nome = req.params.nome; 
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