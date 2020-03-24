class TreeNode {
    constructor(value, lst = null, rst = null) {
        this.value = value;
        this.leftSubTree = lst;
        this.rightSubTree = rst;
        this.height = 0;
    }
}
module.exports = TreeNode;