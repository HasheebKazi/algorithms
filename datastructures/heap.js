const assert = require('assert');

const MIN = 0;
const MAX = 1;

class Heap {
    constructor(arr, type = MIN) {
        if (type === MIN) {
            this.heap = this.createMinHeap(arr);
        } else {
            this.heap = this.createMaxHeap(arr);
        }
        this.size = arr.length;
        this.type = type;
    }

    // naive implementation (nlogn)
    createMinHeap(arr) {
        let heap = Array(arr.length).fill({ key: 0, value: null }); // a heap is a complete binary tree (all nodes have two children except for the last level and all nodes are as far left as possible)
        // representing a complete binary tree with an array is efficient
        // heap[0] = arr[0];
        heap[0] = { key: arr[0].key, value: arr[0].value }

        for (let index = 1; index < arr.length; index++) {
            // heap[index] = arr[index];
            heap[index] = { key: arr[index].key, value: arr[index].value };
            this.minHeapify(heap, index);
        }

        return heap;
    }

    // naive implementation (nlogn)
    createMaxHeap(arr) {
        let heap = Array(arr.length).fill({ key: 0, value: null }); // a heap is a complete binary tree (all nodes have two children except for the last level and all nodes are as far left as possible)
        // representing a complete binary tree with an array is efficient
        // heap[0] = arr[0];
        heap[0] = { key: arr[0].key, value: arr[0].value }

        for (let index = 1; index < arr.length; index++) {
            // heap[index] = arr[index];
            heap[index] = { key: arr[index].key, value: arr[index].value };
            this.maxHeapify(heap, index);
        }

        return heap;
    }

    // logn complexity
    minHeapify(heap, index) {
        // takes an element at an index and bubbles it up
        let parent = Math.ceil(index/2) - 1;
        let temp = null;
        while (parent >= 0) {
            assert(parent >= 0, 'parent is negative abort');
            // if child is greater than parent swap them and update the index
            if (heap[index].value < heap[parent].value) {
                temp = heap[index];
                heap[index] = heap[parent];
                heap[parent] = temp;
                index = parent;
            } else {
                break;
            }
            parent = Math.ceil(index/2) - 1;
        }
    }

    // logn complexity
    maxHeapify(heap, index) {
        // takes an element at an index and bubbles it up
        let parent = Math.ceil(index/2) - 1;
        let temp = null;
        while (parent >= 0) {
            assert(parent >= 0, 'parent is negative abort');
            // if child is greater than parent swap them and update the index
            if (heap[index].value > heap[parent].value) {
                temp = heap[index];
                heap[index] = heap[parent];
                heap[parent] = temp;
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
    Heap, 
    MIN,
    MAX
}

