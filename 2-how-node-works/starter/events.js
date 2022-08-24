const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        super();
    };
};

// creates an object that has all the methods available in Sales() class
const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
    console.log('Customer name: Cristiana');
});

myEmitter.on('newSale', stock => {
    console.log(`There are now ${stock} items left in stock.`);
});

// I'm emitting a new event called 'newSale'
// if you're gonna use a different parameter(s) better to make a class (line 4-ish)
myEmitter.emit('newSale', 9);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const server = http.createServer();

// request is an event predefined by http
server.on('request', (req, res) => {
    console.log('Request received!');
    console.log(req.url);
    res.end('Request received!');
});

server.on('request', (req, res) => {
    console.log('Another request received!');
});

server.on('close', () => {
    console.log('Server closed.');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Waiting for requests...');
});
