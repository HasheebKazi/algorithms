const { swap } = require('../../util');
counter = 0;
function quicksort(arr) {
    quicksort_1(arr, 0, arr.length);
}



function quicksort_1(arr, start, end) {
    
    if (start >= end) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * (end - start) + start);

    swap(arr, randomIndex, end - 1);

    let left = start, right = end - 2;

    while (left <= right) {
        while(arr[left] < arr[end - 1])  {
            left++
        }
        while(arr[right] > arr[end - 1])  {
            right--
        }
        if (left <= right) {
            swap(arr, left, right);
            left++; right--;
        }
    }

    swap(arr, left, end - 1);
    counter++;
    if (counter > 0) {
        return;
    }
    quicksort_1(arr, start, left);
    quicksort_1(arr, left + 1, end);
}

module.exports = {
    quicksort: quicksort
}