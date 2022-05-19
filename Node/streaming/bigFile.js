const fs = require("fs");
const crypto = require("crypto");
 
fs.readFile("bigFile", (readErr, data) => {
  if (readErr) return console.log(readErr);
  const hash = crypto.createHash("sha256").update(data).digest("base64");
  fs.writeFile("./checksum.txt", hash, (writeErr) => {
    writeErr && console.error(err);
  });
});