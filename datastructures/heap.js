const assert = require('assert');

class MaxHeap {
    constructor(arr) {
        this.heap = this.createMaxHeap(arr);
        this.size = arr.length;
    }

    // naive implementation (nlogn)
    createMaxHeap(arr) {
        let heap = [];
        heap.push(arr[0]);

        for (let index = 1; index < arr.length; index++) {
            heap.push(arr[index]);
            this.maxHeapify(heap, index);
        }

        return heap;
    }

    // logn complexity
    maxHeapify(arr, index) {
        // takes an element at an index and bubbles it up
        let parent = Math.ceil(index/2) - 1;
        let temp = null;
        while (parent >= 0) {
            assert(parent >= 0, 'parent is negative abort');
            // if child is greater than parent swap them and update the index
            if (arr[index] > arr[parent]) {
                temp = arr[index];
                arr[index] = arr[parent];
                arr[parent] = temp;
                index = parent;
            } else {
                break;
            }
            parent = Math.ceil(index/2) - 1;
        }
    }
    
    peak() {
        if (this.heap.length > 0) {
            return this.heap[0];
        } else {
            return null
        }
    }

    insert() {

    }

    poll() {

    }

    delete() {

    }
    
    toString() {
        console.log('heap: ', this.heap);
    }
}         

module.exports = {
    MaxHeap
}

