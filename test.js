const { mergesort } = require('./sorting/mergesort/script');
const { quicksort } = require('./sorting/quicksort/script');
const { randomIntArr } = require('./util');


// let arr = randomIntArr(10, 1, 100);
let arr =  [
    80, 23, 99,
    12, 19, 69,
    19,  7, 61,
    33
]
arr2 = [...arr];
console.log('arr before sorting:', arr);
arr = mergesort(arr);
quicksort(arr2);
console.log('arr after mergesort:', arr);
console.log('arr after quicksort:', arr2);

