class TreeNode {
    constructor(value, lst = null, rst = null) {
        /*** core variables ***/
        this.value = value;
        this.leftSubTree = lst;
        this.rightSubTree = rst;
        
        /*** BST augmented bariables for nalancing ***/
        this.height = 0;
        this.balanceFactor = null;

        /*** necessary for rotations ***/
        this.parent = null 
    }
}
module.exports = TreeNode;


class BinarySearchTree {
    constructor(arr) {
        this.bst = this.createBST(arr);
        this.size = arr.length || 0;
    }

    /**
     * @description create a bst from an array of numbers
     * @param {Array} arr 
     * - without balancing this is a O(n^2) algorithm because you may be creating a linked list which you continiously have to traverse from head to tail for each insertion, this becomes the series (0+1+2+3+....+n-1) = (n(n-1))/2 = (n^2-n)
     * - however with balancing we would only have to traverse atgreatert log(n) links for each insert doing n inserts thus we in O(nlogn) steps
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
                // find the insertion position - new nodes are always 
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
            return null;
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

    /**
     * @description add a new value to the binary search tree
     * @param {number} value
     * @return {null} number doesn't exist in the binary search tree
     * @return {number} number does exist in the binary search tree 
     */
    add(value) {
        let temp = this.bst;
        let subTreeChoice = null;
        if (temp !== null) {
            while(true) {
                if (temp === null) {
                    break;
                }
                if (value <= temp.value) {
                    // if the value is less than or equal the current nodes value, look to its left subtree
                    if (temp.leftSubTree !== null) {
                        temp = temp.leftSubTree;
                    } else {
                        subTreeChoice = 0;
                        break;
                    }
                } else if (value > temp.value) {
                    // if the value is greater than the current nodes value, look to its left subtree
                    if (temp.rightSubTree !== null) {
                        temp = temp.rightSubTree;
                    } else {
                        subTreeChoice = 1;
                        break;
                    }
                } 
            }
        }

        if (!this.size || this.size < 0) {
            this.size = 1;
        } else {
            this.size++;
        }
        if (subTreeChoice === null && temp === null) {
            this.bst = new TreeNode(value);
        } else {
            if (subTreeChoice === 0) {
                temp.leftSubTree = new TreeNode(value);
            } else if (subTreeChoice === 1) {
                temp.rightSubTree = new TreeNode(value);
            } else {
                throw new Error('Adding the subtree failed, can\'t find a spot')
            }
        }
        
    }

    delete(value) {

        /** first find and delete the value **/
        /*** the pointer should point to the subtree as a whole or the parent of the node we want to delete */
        let temp = this.bst;
        let parent = this.bst
        let subTreeChoice = null;
        if (temp === null) {
            /*** the subtree is empty */
            return null;
        } else {
            while(true) {
                if (temp === null) {
                    /*** the value doesn't exist in our tree */
                    return null;
                } else if (temp.value === value) {
                    break;
                } else {
                    if (value < temp.value) {
                        parent = temp;
                        temp = temp.leftSubTree;
                        subTreeChoice = 0;
                    } else {
                        parent = temp;
                        temp = temp.rightSubTree;
                        subTreeChoice = 1;
                    }
                }
            }
        }

        /** Four cases */

        /*** Both subtrees of the deleted node are null */
        if (temp.leftSubTree === null && temp.rightSubTree === null) {
            if (subTreeChoice === 0) {
                parent.leftSubTree = null;
            } else {
                parent.rightSubTree = null;
            }
            this.size--;
            return;
        }
        /*** the rightsubtree is null, the leftsubtree is valid */
        if (temp.leftSubTree !== null && temp.rightSubTree === null) {
            if (subTreeChoice === 0) {
                parent.leftSubTree = temp.leftSubTree;
            } else {
                parent.rightSubTree = temp.leftSubTree;
            }

            this.size--;
            return;
        }
        /*** the leftsubtree is null, the rightsubtree is valid */
        if (temp.leftSubTree === null && temp.rightSubTree !== null) {
            if (subTreeChoice === 0) {
                parent.leftSubTree = temp.rightSubTree;
            } else {
                parent.rightSubTree = temp.rightSubTree;
            }

            this.size--;
            return;
        }

        /*** the left and right subtrees are not null */
        if (temp.leftSubTree !== null && temp.rightSubTree !== null) {
            let predecessor = this.predecessor(temp);
            let tempValue = predecessor.value;
            this.delete(predecessor.value);
            temp.value = tempValue
            this.size--;
            return;
        }


    }

    /**
     * @description Search the binary search tree for a particular value
     * @param {number} value the value you are looking for in the binary search tree
     * @return {number} the value when its first instance is found
     * @return {null} if the value doesn't exist in the tree
     */
    search(value) {
        let temp = this.bst;
        if (temp === null) {
            return null;
        } else {
            while(true) {
                if (temp === null) {
                    return null;
                } else if (value === temp.value) {
                    return value;
                } else {
                    if (value < temp.value) {
                        temp = temp.leftSubTree;
                    } else {
                        temp = temp.rightSubTree;
                    }
                }
            }
        }
    }

    /**
     * @description Find the lasrgest value in the left subtree of a given node
     * @param {TreeNode} nodeRef the treenode whos predecessor you are looking for
     * @return {number} the node has a predecessor
     * @return {null} the node doesn't have a predecessor
     */
    predecessor(nodeRef) {
        if (nodeRef === null || nodeRef === undefined || typeof nodeRef !== 'object') {
            return null;
        } else {
            let temp = nodeRef.leftSubTree;
            
            // only called if the left subtree exists but this is for error checking;
            if (temp === null) {
                // throw new Error('Finding predecessor failed because the lst doesn\'t exist');
                return null;
            }

            while(true) {
                if (temp.rightSubTree === null) {
                    return temp;
                } else {
                    temp = temp.rightSubTree;
                }
            }
        }
    }

    /**
     * @description Find the smallest value in the right subtree of a given node
     * @param {TreeNode} nodeRef the treenode whos successsor you are looking for
     * @return {number} the node has a successor
     * @return {null} the node doesn't have a successor
     */
    successor(nodeRef) {
        if (nodeRef === null || nodeRef === undefined || typeof nodeRef !== 'object') {
            return null;
        } else {
            let temp = nodeRef.rightSubTree;
            
            // only called if the left subtree exists but this is for error checking;
            if (temp === null) {
                // throw new Error('Finding predecessor failed because the lst doesn\'t exist');
                return null;
            }

            while(true) {
                if (temp.leftSubTree === null) {
                    return temp;
                } else {
                    temp = temp.leftSubTree;
                }
            }
        }
    }

    avlBalance() {

    }
}

module.exports = BinarySearchTree;