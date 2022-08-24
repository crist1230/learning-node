// Basically, these modules are like packaged objects and when you use them you access a certain proprty/method on the object.
// Requiring a built-in module that can access the file system of a computer.
const fs = require('fs');

// http is a built-in module that gives us networking capabilities (like building an http server).
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

///////READING FILES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // *******************************BLOCKING/SYNCHRONOUS METHOD*****************************************
// // readFileSync = read a file scynchronously
// //      => synchromous is also called blocking code because it blocks the next line of code before it gets run.
// // './txt/input.txt' = the dot is the home route (where this current file is stored), go into a folder called txt and get the input.txt file.
// // utf-8 = the file encoding (tells the computer what characters to show based on the encoding standard)
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn} \nCreated on ${Date()}.`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// // *******************************NON-BLOCKING/ASYNCHRONOUS METHOD*************************************
// // With callback functions, the first paramenter should always be error.
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log(err);

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('Your file has been written.');
//             });
//         });
//     });
// });
// console.log('Will read file!');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// JSON.parse(data) takes the data as a json file and transforms it into js.
const dataObj = JSON.parse(data);

// You call the method 'createServer' on the http object and this method takes a callback function that gets fired off when a new request hits the server.
//   => This callback has access to 2 variables when a request is made: req - which gives us access to information regarding the request object (such as where it came from and
//      what information it holds) and res - which gives us tools to send as a response to the server.
// server = the result after using the 'createServer' method
const server = http.createServer((req, res) => {

    // url.parse(...) is using the url module to run a method
    //   => req.url is getting the url from the request
    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW
    if (pathname === '/' || pathname === '/overview') {
        // res.writeHead can send status codes as well as HTTP headers to the browser.
        //     => A header is a piece of information about the response we're sending to the browser. In this case we're giving information
        //        about the response's content type
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);


        res.end(output);

    // PRODUCT
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
 
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);

    // NOT FOUND
    } else {
        // In this case using res.writeHead, we are letting the browser know that if the URL of the request is anything other than what was specified above,
        // then the server will send a response to the browser letting the browser know that this request resulted in an error.
        res.writeHead(404, {
            'Content-type': 'text/html',
            // my-own-header is basically just sending itself to the browser as a response header
            'my-own-header': 'hello-world',
        });
        // We can write the h1 tags in because the browser knows to expect HTML from the writeHead method above.
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000.');
});
