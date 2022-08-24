// const fs = require('fs');

// setTimeout(() => console.log('Timer 1 finished'), 0);
// setImmediate(() => console.log('Immediate 1 finished'));

// fs.readFile('test-file.txt', () => {
//     console.log('I/O finished');
// });

// console.log('Hello from the top-level code'); // Top-level code so it gets executed first

// // Prediction:  10, 6, 3, 4 // idk why 6 gets executed first but i remember something about I/O executing after top-level code
// // Actual:      10, 3, 4, 6 // the last 3 aren't in any particular order, because the code isn't running on the event loop yet

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');

// setTimeout(() => console.log('Timer 1 finished'), 0);
// setImmediate(() => console.log('Immediate 1 finished'));

// fs.readFile('test-file.txt', () => {
//     console.log('I/O finished');

//     setTimeout(() => console.log('Timer 2 finished'), 0);
//     setTimeout(() => console.log('Timer 3 finished'), 3000);
//     setImmediate(() => console.log('Immediate 2 finished'));

// });

// console.log('Hello from the top-level code');

// // Prediction:  29, 17, 18, 21, 23, 25, 24
// // Actual:      29, 17, 18, 21, 25, 23, 24 // setImmediate runs before a 0 timer because the process it follows calls it before timers

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const fs = require('fs');

// setTimeout(() => console.log('Timer 1 finished'), 0);
// setImmediate(() => console.log('Immediate 1 finished'));

// fs.readFile('test-file.txt', () => {
//     console.log('I/O finished');
//     console.log('--------------');

//     setTimeout(() => console.log('Timer 2 finished'), 0);
//     setTimeout(() => console.log('Timer 3 finished'), 3000);
//     setImmediate(() => console.log('Immediate 2 finished'));

//     process.nextTick(() => console.log('Process.nextTick()'));

// });

// console.log('Hello from the top-level code');

// // Prediction:  51, 36, 37, 40, 41, 45, 43, 47, 44
// // Actual:      51, 36, 37, 40, 41, 47, 45, 43, 44

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O finished');
    console.log('--------------');

    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick()'));

    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');
    
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });

});

console.log('Hello from the top-level code');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
