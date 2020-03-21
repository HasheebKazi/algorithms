const assert = require('assert');
const { swap } = require('../../util');


const MIN = 0;
const MAX = 1;

class Heap {
    constructor(iterableObject, type = MIN) {
        if (type === MIN) {
            this.heap = this.createMinHeap(iterableObject);
        } else {
            this.heap = this.createMaxHeap(iterableObject);
        }
        this.type = type;
        // this.type = type;
    }

    // naive implementation (nlogn)
    createMinHeap(arr) {
        let heap = Array(arr.length).fill(0); 
        // a heap is a complete binary tree (all nodes have two children except for the last level and all nodes are as far left as possible)
        // representing a complete binary tree with an array is efficient
        heap[0] = arr[0];
        // heap[0] = { key: arr[0].key, value: arr[0].value };

        for (let index = 1; index < arr.length; index++) {
            // console.log('added to min heap:', this.heap);
            heap[index] = arr[index];
            // heap[index] = { key: arr[index].key, value: arr[index].value };
            this.minHeapify(index, heap);
        }

        return heap;
    }


    // logn complexity
    minHeapify(index, heap) {
        // takes an element at an index and bubbles it up
        let parent = Math.ceil(index/2) - 1;
        // console.log('index: ', index);
        // console.log('parent: ', parent);

        assert(parent >= 0, 'parent is negative abort');  // the parent should never be zero
        let temp = null;
        // min heapify until no more swaps can be made or the child element is greater than or equal to its parent
        while (parent >= 0) {
            // if child is greater than parent swap them and update the index
            if (heap[index] < heap[parent]) {
            // if (this.heap[index].value < this.heap[parent].value) {
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
            console.log('[ peak() - error : the heap is empty ]');
            return null
        }
    }

    minHeapifyDown(index, heap) {
        if (!Number.isInteger(index) || index < 0) {
            assert(false, 'Index: ' + index + ' is out of bounds');
        }

        // find the min
        // swap the current and min
        // index is incremented to index of swapped
        let leftChild = null;
        let rightChild = null;
        let temp = null;
        let min = null;
        // repeat until no more swaps possible
        while (index < this.heap.length) {
            // first verify left and right child exist
            leftChild = index*2 + 1; // this can only be an integer
            rightChild = index*2 +2;
            if (heap[leftChild] === undefined && heap[rightChild] === undefined) {
                break;
            }
            if (leftChild >= this.heap.length && rightChild >= this.heap.length) {
                break;
            }

            if (leftChild < this.heap.length && rightChild >= this.heap.length) {
                min = leftChild;
            } else if (leftChild < this.heap.length && rightChild < this.heap.length) {
                min = heap[leftChild] <= heap[rightChild] ? leftChild : rightChild;
            } else {
                break;
            }
            // console.log('maxHeapifyDown passed checks - min:', min);
            // console.log('maxHeapifyDown passed checks - index:', index);
            if (heap[index] > heap[min]) {
            // if (this.heap[index].value < this.heap[parent].value) {
                temp = heap[index];
                heap[index] = heap[min];
                heap[min] = temp;
                index = min;
            } else {
                break;
            }
        }
    };

    // return the largest or smallest element in the heap and delete it
    delete() {
        // implement delete
        // only delete if the heap has elements
        if (this.heap.length > 0) {
            // save the smallest element
            let smallest = this.heap[0];
            // swap the last element in the heap whatever it is 
            this.heap[0] = this.heap[this.heap.length -1];
            this.heap.pop();
            this.minHeapifyDown(0, this.heap);
            return smallest;
        }
    }

    insert(value) {
        // implement insert
        // add the element to the end of the array and then min/max heapify it
        this.heap.push(value);
        this.minHeapify(this.heap.length - 1, this.heap);
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

