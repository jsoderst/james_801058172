//serving static resources

const http = require('http');
const fs = require('fs');

// const server = http.createServer((req, resp)=>{
//     if(req.url === '/'){
//         resp.write('Hello World, from nodejs');
//         resp.end(); 
//     }
//     else {
//         resp.write('Using some other domain');
//         resp.end();
//     }
// });

const server = http.createServer((req, resp)=>{
    const readStream = fs.createReadStream('./static/example.json');
    resp.writeHead(200, {'Content-type': 'application/json'});
    // resp is a writeable stream
    readStream.pipe(resp);
}).listen(3000);

// server.listen('3000');

/* 
    package.json contains metadata
    npm is node package manager
    npm init will prompt you for some info

    can install external packages (reusable code, folder with modules)
*/