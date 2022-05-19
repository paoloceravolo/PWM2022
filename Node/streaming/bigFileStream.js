const fs = require("fs");
const crypto = require("crypto");
const {pipeline} = require('stream');

const hash = crypto.createHash('sha256');
hash.setEncoding('base64');

const inputStream = fs.createReadStream('bigFile');
const outStream = fs.createWriteStream('checksum.txt');

//inputStream.pipe(hash).pipe(outStream);

pipeline(inputStream, hash, outStream, (err)=>{
  console.log(err);
})