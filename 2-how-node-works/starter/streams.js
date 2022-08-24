const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // // Solution 1 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // // Problem: Waits for the entire file to be loaded which is slow
    // fs.readFile('test-file.txt', (err, data) =>  {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // // Solution 2: Streams /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // // Problem: The createReadStream() is reading the data much faster than the response can be sent (aka "backpressure")
    // // 'data' 'end' & 'error' are all "preloaded" evenets on createReadStream()
    // const readable = fs.createReadStream('test-file.txt'); // const readable = new EventEmitter(); // emits some data
    // readable.on('data', chunk => { // when the readable emits some data then do the res.write() thing
    //     res.write(chunk);
    // });

    // // Note: you need to have an ending event listener otherwise it will keep waiting for more data to be loaded even if there's none left
    // readable.on('end', () => { // when readable registers that it's done loading all the data it will end the response
    //     res.end();
    // });

    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found!');
    // });

    // // Solution 3 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    // readableSource.pipe(writableDestination);

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on port 8000...');
});