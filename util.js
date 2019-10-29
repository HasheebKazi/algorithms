function randomArr(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random()*max)+min);
    }
    return arr;
}

function swap(arr, findex, sindex) {
    let temp = arr[sindex];
    arr[sindex] = arr[findex];
    arr[findex] = temp;
}

module.exports  = {
    randomIntArr: randomArr,
    swap: swap
}