function mergesort(arr) {
    let arrLength = arr.length;
    if (arrLength < 2) {
        return arr;
    }
    
    const start = 0,
        mid = Math.floor(arrLength / 2),
        end = arrLength;

    const leftArr = arr.slice(start, mid);
    const rightArr = arr.slice(mid, end);

    return merge(mergesort(leftArr), mergesort(rightArr));
}

function merge(leftArr, rightArr) {
    const results = new Array(leftArr.length + rightArr.length);
    let x = 0, y = 0, i = 0;

    while(x < leftArr.length && y < rightArr.length) {
        if (leftArr[x] <= rightArr[y]) {
            results[i++] = leftArr[x++];
        } else {
            results[i++] = rightArr[y++];
        }
    }

    while(x < leftArr.length) {
        results[i++] = leftArr[x++];
        
    }

    while(y < rightArr.length) {
        results[i++] = rightArr[y++];
    }

    return results;
}

module.exports = {
    mergesort: mergesort
}

