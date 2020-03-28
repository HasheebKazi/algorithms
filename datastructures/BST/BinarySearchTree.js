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
        this.bst = null;
        this.size = arr.length || 0;
        this.createBST(arr);
    }

    /**
     * @description create a bst from an array of numbers
     * @param {Array} arr contains the initial valuse that will be inserted into the BST
     * - without balancing this is a O(n^2) algorithm because you may be creating a linked list which you continiously have to traverse from head to tail for each insertion, this becomes the series (0+1+2+3+....+n-1) = (n(n-1))/2 = (n^2-n)
     * - however with balancing we would only have to traverse atgreatert log(n) links for each insert doing n inserts thus we in O(nlogn) steps
     */
    createBST(arr) {
        if (arr.length === 0 || arr === null || arr === undefined) {
            this.bst = null;
            this.size = 0;
        } else {
            arr.forEach((value, index) => {
                this.add(value);
            });
        }
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
        if (temp !== null && temp !== undefined) {
            /**** find insertion position, node + left or right child */
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

        if (subTreeChoice === null && temp === null || temp === undefined) {
            this.bst = new TreeNode(value);
            this.bst.parent = null;
            this.size = 1;
        } else {
            if (subTreeChoice === 0) {
                temp.leftSubTree = new TreeNode(value);
                temp.leftSubTree.parent = temp;
            } else {
                temp.rightSubTree = new TreeNode(value);
                temp.rightSubTree.parent = temp;
            } 
            this.size++;
        }

        /**** update tree with new heights */
        let climber = null;
        if (subTreeChoice === 0) {
            climber = temp.leftSubTree;
        } else if (subTreeChoice === 1) {
            climber = temp.rightSubTree;
        } else {
            climber = this.bst;
            climber.height = 0;
            return;
        }

        /**** climb up the tree and update heights as necessary */
        climber.height = 0;
        let parentLeftSubTree = null;
        let parentRightSubTree = null;
        let oldHeight = null;
        while(climber.parent !== null) {
            climber = climber.parent;
            if (climber.leftSubTree) {
                parentLeftSubTree = climber.leftSubTree.height;
            } else {
                parentLeftSubTree = -1;
            }
            if (climber.rightSubTree) {
                parentRightSubTree = climber.rightSubTree.height;
            } else {
                parentRightSubTree = -1;
            }
            oldHeight = climber.height;
            climber.height = Math.max(parentLeftSubTree, parentRightSubTree) + 1;
            if (oldHeight === climber.height) {
                return;
            }
        }
        
    }

    delete(value) {

        /*** first find and delete the value */
        /**** the pointer should point to the subtree as a whole or the parent of the node we want to delete */
        let temp = this.bst;
        let parent = this.bst;
        let subTreeChoice = null;
        let updateCase = 0;
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
        if (temp.leftSubTree === null && temp.rightSubTree === null) {
            /*** Both subtrees of the deleted node are null */
            if (this.bst.height === 0) {
                this.bst = null;
                return;
            } else {
                if (subTreeChoice === 0) {
                    parent.leftSubTree = null;
                } else {
                    parent.rightSubTree = null;
                }
            }
            updateCase = 1;
        } else if (temp.leftSubTree !== null && temp.rightSubTree === null) {
            /*** the rightsubtree is null, the leftsubtree is valid */
            if (subTreeChoice === 0) {
                parent.leftSubTree = temp.leftSubTree;
            } else {
                parent.rightSubTree = temp.leftSubTree;
            }
            updateCase = 2;
        } else if (temp.leftSubTree === null && temp.rightSubTree !== null) {
            /*** the leftsubtree is null, the rightsubtree is valid */
            if (subTreeChoice === 0) {
                parent.leftSubTree = temp.rightSubTree;
            } else {
                parent.rightSubTree = temp.rightSubTree;
            }
            updateCase = 3;
        } else if (temp.leftSubTree !== null && temp.rightSubTree !== null) {
            updateCase = 4;
            /*** the left and right subtrees are not null */
            let predecessor = this.predecessor(temp);
            let tempValue = predecessor.value;
            this.delete(predecessor.value);
            temp.value = tempValue
        }
        this.size--;

        /** NOTE: WORKS CORRECTLY UNTIL HERE
         * - HEIGHT ADJUSTMENT HASN'T BEEN THOROUGHLY TESTED FOR DELETES **/

        if (updateCase !== 4) {
            /**** fix heights after deleting a node */
            /**** update tree with new heights */
            let climber = null;
            if (parent.leftSubTree === null && parent.rightSubTree === null) {
                climber = parent;
            } else {
                if (subTreeChoice === 0) {
                    climber = parent.leftSubTree;
                } else if (subTreeChoice === 1) {
                    climber = parent.rightSubTree;
                } else {
                    climber = this.bst;
                    climber.height = 0;
                    return;
                }
            }
    
            /**** climb up the tree and update heights as necessary */
            if (updateCase === 1) {
                climber.height = 0;
            } else if (updateCase === 2 || updateCase === 3) {
                if (subTreeChoice === 0) {
                    climber.height = parent.leftSubTree + 1;
                } else {
                    climber.height = parent.rightSubTree + 1;
                }
            }
            let parentLeftSubTree = null;
            let parentRightSubTree = null;
            let oldHeight = null;
            while(climber.parent !== null) {
                climber = climber.parent;
                if (climber.leftSubTree) {
                    parentLeftSubTree = climber.leftSubTree.height;
                } else {
                    parentLeftSubTree = -1;
                }
                if (climber.rightSubTree) {
                    parentRightSubTree = climber.rightSubTree.height;
                } else {
                    parentRightSubTree = -1;
                }
                oldHeight = climber.height;
                climber.height = Math.max(parentLeftSubTree, parentRightSubTree) + 1;
                if (oldHeight === climber.height) {
                    return;
                }
            }
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