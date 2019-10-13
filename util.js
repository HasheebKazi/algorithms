function randomArr(size, min, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random()*max)+min);
    }
    return arr;
}

module.exports  = {
    randomIntArr: randomArr
}