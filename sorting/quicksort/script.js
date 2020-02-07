const { swap } = require('../../util');
counter = 0;
function quicksort(arr) {
    quicksort_1(arr, 0, arr.length);
}



function quicksort_1(arr, start, end) {
    // if start >= end there is no need to sort any more
    if (start >= end) {
        return;
    }

    // pick a random pivot
    const randomIndex = Math.floor(Math.random() * (end - start) + start);

    // swap with the end of the array
    swap(arr, randomIndex, end - 1);

    let left = start, right = end - 2;

    // look for the next item from left that is greater than the pivot and first item from the right that is less than the pivot and swap them
    // doing all of these puts items bigger than the pivot to its right and items smaller than it to its left
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

    // swap pivot and the left index so that only items bigger than it are to its left
    swap(arr, left, end - 1);

    // quick sort the left and right arrays
    quicksort_1(arr, start, left);
    quicksort_1(arr, left + 1, end);
}

module.exports = {
    quicksort: quicksort
}