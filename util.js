const assert = require('assert');

function randomArr(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random()*(max - min))+min);
    }
    return arr;
}

function compareArr(arr1, arr2) {
    assert(arr1.length === arr2.length, 'Error arr lenghts don\'t match ' + arr1.length + ' ' + arr2.length);
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function swap(arr, findex, sindex) {
    let temp = arr[sindex];
    arr[sindex] = arr[findex];
    arr[findex] = temp;
}

module.exports  = {
    randomIntArr: randomArr,
    swap: swap,
    compareArr: compareArr
}