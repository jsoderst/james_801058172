const fs = require('fs');
//for compression
const zlib = require('zlib');
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

//reading as a chunk is more efficient

const readStream = fs.createReadStream('./example.txt', 'utf-8');
const writeStream = fs.createWriteStream('./write.txt');

// can use pipes instead of doing this
// readStream.on('data', (chunk)=>{
//     writeStream.write(chunk);
// });

//takes what readstream outputs and pipes it into writestream, source -> destination
// readStream.pipe(writeStream);

//transform stream, takes input -> compresses -> uncompresses -> writes
readStream.pipe(gzip).pipe(gunzip).pipe(writeStream);