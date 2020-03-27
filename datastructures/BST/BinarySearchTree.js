class TreeNode {
    constructor(value, lst = null, rst = null) {
        this.value = value;

        this.leftSubTree = lst;
        this.rightSubTree = rst;
        
        this.height = 0;
        this.balanceFactor = null;

        this.parent = null // this is necessary for tree rotations, the root is the only node with a null pointer
    }
}
module.exports = TreeNode;


class BinarySearchTree {
    constructor(arr) {
        this.bst = this.createBST(arr);
        this.size = arr.length;
    }


    /**
     * 
     * @param {*} arr 
     * @description 
     * - without balancing this is a O(n^2) algorithm because you may be creating a linked list which you continiously have to 
     *     - traverse from head to tail for each insertion, this becomes the series (0+1+2+3+....+n-1) = (n(n-1))/2 = (n^2-n)/2
     * - however with balancing we would only have to traverse at most log(n) links for each insert doing n inserts thus we could build the 
     *     - tree in O(nlogn) steps
     * 
     */
    createBST(arr) {
        if (arr.length > 0) {
            const head = new TreeNode(arr[0]);
            head.height = 0;
            let node = null;
            let temp = head;
            for (let i = 1; i < arr.length; i++) {
                node = new TreeNode(arr[i]);
                temp = head;
                // find the insertion position - new nodes are always added to the leaves of the tree
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
            this.initializeSubTreeHeights(head);
            return head;
        } else {
            return new TreeNode(null);
        }
    }

    initializeSubTreeHeights(head) {
        const inOrder = (head) => {
            if (head === null || head === undefined) {
                return - 1;
            } else {
                let leftSubTreeHeight = inOrder(head.leftSubTree);
                let rightSubTreeHeight = inOrder(head.rightSubTree);
                head.height = Math.max(leftSubTreeHeight, rightSubTreeHeight) + 1;
                head.balanceFactor = (leftSubTreeHeight - rightSubTreeHeight);
                return head.height;
            }
        };

        inOrder(head);
    }

    add(value) {
        let temp = this.bst;
        while(true) {
            if (temp === null) {
                break;
            }
            if (value <= temp.value) {
                temp = temp.leftSubTree;
            } else if (value > temp.value) {
                // look at right sub tree
                temp = temp.rightSubTree;
            } else {
                break;
            }
        }
        this.size++;
        temp = new TreeNode(value);
    }

    delete(value) {
        // first find the value
        let temp = this.bst;
        if (temp === null || temp.value === null) {
            return null;
        } else {
            while(true) {
                if (temp === null) {
                    return null;
                } else if (value === temp.value) {
                    break;
                } else {
                    if (value < temp.value) {
                        // look at left sub tree
                        temp = temp.leftSubTree;
                    } else {
                        // look at right sub tree
                        temp = temp.rightSubTree;
                    }
                }
            }
        }

        // then there are four cases

        // if both children are empty delete the node
        if (temp.leftSubTree === null && temp.rightSubTree === null) {
            temp = null;
            this.size--;
            return;
        }

        if (temp.leftSubTree !== null && temp.rightSubTree === null) {
            temp = temp.rightSubTree;
            this.size--;
            return;
        }

        if (temp.leftSubTree === null && temp.rightSubTree !== null) {
            temp = temp.leftSubTree;
            this.size--;
            return;
        }

        if (temp.leftSubTree !== null && temp.rightSubTree !== null) {
            let predecessor = this.predecessor(temp);
            temp.value = predecessor.value;
            this.size--;
            this.delete(predecessor);
            return;
        }


    }

    search(value) {
        // return value if the value exists, else return null
        // check if the bst has values
        let temp = this.bst;
        if (temp === null || temp.value === null) {
            return null;
        } else {
            while(true) {
                if (temp === null) {
                    return null;
                } else if (value === temp.value) {
                    return value;
                } else {
                    if (value < temp.value) {
                        // look at left sub tree
                        temp = temp.leftSubTree;
                    } else {
                        // look at right sub tree
                        temp = temp.rightSubTree;
                    }
                }
            }
        }
    }

    predecessor(nodeRef) {
        let temp = nodeRef.leftSubTree;
        while(true) {
            if (temp.rightSubTree === null) {
                return temp;
            } else {
                temp = temp.rightSubTree;
            }
        }
    }

    avlBalance() {

    }
}

module.exports = BinarySearchTree;