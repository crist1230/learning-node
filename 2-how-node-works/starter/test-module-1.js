// // Export Way 1 //////////////////////////////////////////////////////////////////
class Calculator {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
}

module.exports = Calculator;


// // Export Way 2 //////////////////////////////////////////////////////////////////
module.exports = class {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
};