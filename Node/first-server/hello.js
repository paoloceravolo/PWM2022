const http = require("http");
const fs = require('fs').promises;
const host = 'localhost';
const port = 8000;
const path = require('path');

//const requestListener = function (req, res) {
//    res.setHeader("Content-Type", "application/json");
//    res.writeHead(200);
//    res.end(`{"message": "This is a JSON response"}`);
//};

const requestListener = function (req, res) {
	console.log("Richiesta ", req.url);
	let filePath = path.join(__dirname, req.url);
    fs.readFile(filePath)
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err.message);
            return;
        });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});