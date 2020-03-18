"use strict";
const assert = require('assert').strict;

const dynamicFib = (num) => {

    assert.strictEqual(typeof num, "number");
    let DParr = new Array(num).fill(null);
    DParr[0] = 0; DParr[1] = 1;
    const fib = num => {
        if (num <= 1) {
            return DParr[num];
        } else {
            // if we don't know the resut to fib(x-1) and fib(x-2), we first calculate it and store it in DParr[x], then we use it to calculate the value of fib(x)
            if (DParr[num - 1] === null) {
                DParr[num - 1] = fib(num - 1);
                console.log('DParr[', num-1, ']:', DParr[num - 1]);
            }
            if (DParr[num - 2] === null) {
                DParr[num - 2] = fib(num - 2);
                console.log('DParr[', num-2, ']:', DParr[num - 2]);
            }
            return DParr[num - 1] + DParr[num - 2];
        }
    }
    return fib(num);
}

let x = dynamicFib(10);
console.log('Fibonnaci 10:', x);