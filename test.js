const { mergesort } = require('./sorting/mergesort/script');
const { quicksort } = require('./sorting/quicksort/script');
const { randomIntArr } = require('./util');

// let arr = null, og = null, x = null, y = null;
// for (let index = 0; index < 100; index++) {
//     // console.log('gogogo')
//     arr = randomIntArr(10, 1, 15);
//     og = [...arr];
//     arr2 = [...arr];
//     arr = mergesort(arr);
//     quicksort(arr2);
//     x = JSON.stringify(arr); y = JSON.stringify(arr2);
//     if (x == y) {
//         console.log('test case failed');
//         console.log('original arr:', og);
//         console.log('merge sorted:', arr);
//         console.log('quicksorted:', arr2);
//     }

// }

let arr = null, og = null, x = null, y = null;
// arr2 = randomIntArr(10, 1, 15);
arr2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
console.log(arr2);
quicksort(arr2);
console.log(arr2)

