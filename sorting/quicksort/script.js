counter = 0;

function quicksort(arr) {
    quicksort_1(arr, 0, arr.length);
}

function quicksort_1(arr, start, end) {
    
    if (start >= end) {
        return;
    }
    const randomIndex = Math.floor(Math.random() * (end - start) + start);

    

    let temp = arr[end - 1];
    arr[end - 1] = arr[randomIndex];
    arr[randomIndex] = temp;
    let temp2 = null;
    let left = start, right = end - 2;


    while (left < right) {
        while(arr[left] < arr[end - 1])  {
            left++
        }
        while(arr[right] > arr[end - 1])  {
            right--
        }
        if (left > right) {
            break;
        }
        temp2 = arr[right];
        arr[right] = arr[left];
        arr[left] = temp2;
    }



    temp = arr[end - 1];
    arr[end - 1] = arr[left];
    arr[left] = temp;
    quicksort_1(arr, start, left);
    quicksort_1(arr, left + 1, end);
}

module.exports = {
    quicksort: quicksort
}