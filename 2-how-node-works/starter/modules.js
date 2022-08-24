// // arguments is a variable that will store the arguments passed into a function and it will return something
// // if the code is actually wrapped in a function (which it is)
// console.log(arguments);

// // can show built in modules
// // .wrapper shows the wrapper function
// console.log(require('module').wrapper);

// // module.exports /////////////////////////////////
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// // exports ///////////////////////////////////////
// const calc2 = require('./test-module-2');
//     // returns an object that contains all the methods declared in the module
// console.log(calc2.multiply(2, 5));

// destructuring
const {add, multiply, divide} = require('./test-module-2');
console.log(multiply(2, 5));


// // caching ///////////////////////////////////////
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();