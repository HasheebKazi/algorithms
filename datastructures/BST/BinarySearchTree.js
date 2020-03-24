const TreeNode = require('./TreeNode');


class BinarySearchTree {
    constructor(arr) {
        this.bst = this.createBST(arr);
        this.size = arr.length;
    }
    
    createBST(arr) {
        const head = new TreeNode(arr[0]);
        let node = null;
        let temp = head;
        for (let i = 1; i < arr.length; i++) {
            node = new TreeNode(arr[i]);
            temp = head;
            // find the insertion position
            while(true) {
                if ( node.value <= temp.value ) {
                    if (temp.leftSubTree === null) {
                        temp.leftSubTree = node;
                        break;
                    } else {
                        temp = temp.leftSubTree;
                    }
                } else if ( node.value > temp.value ) {
                    if (temp.rightSubTree === null) {
                        temp.rightSubTree = node;
                        break;
                    } else {
                        temp = temp.rightSubTree;
                    }
                } else {
                    throw new Error('Something went wrong: the element is neither less than, equal to or greater than ');
                }
            }
        }


        return head;
    }
}

module.exports = BinarySearchTree;