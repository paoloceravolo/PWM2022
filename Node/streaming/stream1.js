const fs = require('fs');

const readable = fs.createReadStream('file.txt', {highWaterMark: 27});

//readable.on('data', (chunk)=>{
//	console.log(`Leggo ${chunk.length} bytes \n ${chunk.toString()}\n`);
//});
(async () => {
for await (var chunk of readable){
	console.log(`Leggo ${chunk.length} bytes \n ${chunk.toString()}\n`);
}
})();