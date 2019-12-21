const assert = require('assert');

class MaxHeap {
    constructor(arr) {
        this.heap = this.createMaxHeap(arr);
        this.size = arr.length;
    }

    createMaxHeap(arr) {
        return arr;
    }

    maxHeapify(index) {
        // takes an element at an index and bubbles it up
        let parent = Math.ceil(index/2) - 1;
        let temp = null;
        while (parent >= 0) {
            assert(parent >= 0, 'parent is negative abort');
            // if child is greater than parent swap them 
            console.log('i', index);
            console.log('p', parent);

            parent = Math.ceil(index/2) - 1;
            if (this.heap[index] > this.heap[parent]) {
                temp = this.heap[index];
                this.heap[index] = this.heap[parent];
                this.heap[parent] = temp;
                index = parent;
            } else {
                break;
            }
        }
    }

    poll() {
        if (this.heap.length > 0) {
            return this.heap[0];
        } else {
            return null
        }
    }

    insert() {

    }

    removeRoot() {

    }

    
    
    toString() {
        console.log('heap: ', this.heap);
    }
}         

module.exports = {
    MaxHeap
}

