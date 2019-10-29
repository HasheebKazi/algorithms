// rotate an NxN matrix

let n = 1;
let matrix = [];
let rotatedMatrix = [];

for (let y = 0; y < n; y++) {
    matrix.push([]);
    rotatedMatrix.push([]);
    for (let x = 0; x < n; x++) {
        matrix[y][x] = [y,x];
        // rotatedMatrix[y][x] = [null, null];
    }
}
// console.log(matrix)
// console.log(rotatedMatrix);

for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
        rotatedMatrix[y].push(matrix[x][y])
    }
    rotatedMatrix[y].reverse();
    // break
}


console.log(matrix);
console.log(rotatedMatrix);
