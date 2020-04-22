const numOfPaths = (matrix) => {
    let max = 0;
    let dpTable = [];
    for (let i = 0; i < matrix.length; i++) {
        dpTable.push(new Array(matrix[0].length).fill(-1));
    }
    // console.log(dpTable);
    const chooseMove = (row, col) => {
        // domain checks
        if (row < 0 || row >= matrix.length) {
            return 0;
        }
        if (col < 0 || col >= matrix[0].length) {
            return 0;
        }
        if (matrix[row][col] === -1) {
            return 0;
        }

        // base case: memo check
        if (dpTable[row][col] !== -1) {
            return dpTable[row][col];
        } 
        // base case: goal reached
        if (row === matrix.length -1 && col === matrix[0].length -1) {
            return 1;
        }

        // recursive case
        dpTable[row][col] = chooseMove(row +1, col) + chooseMove(row, col + 1);
        if (dpTable[row][col] > max) {
            max = dpTable[row][col];
        }
        // console.log(row, col, dpTable);

        return dpTable[row][col];
    };
    chooseMove(0, 0);
    return max;

};

let matrix = [
    [0, 0, -1, 0],
    [-1, 0, 0, 0],
    [0, 0, 0, 0]
];

console.log(numOfPaths(matrix));


