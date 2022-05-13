const http = require('http');
const fs = require('fs');

const port = 8383;
var s = http.createServer();
s.listen(port);

console.log('Server attivo su ', port);

s.on('request', function(req,res){
	let url = req.url;
	console.log(url);
	fs.readFile('./index.html', function(err,data){
		if(err) throw err;
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	});
	console.log('Connessione attiva');
});