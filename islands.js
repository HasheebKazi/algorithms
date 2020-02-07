let islands = [
    [3,2,1,0,0],
    [4,5,0,0,0],
    [6,0,0,1,1]
]

let dict = {};
let counter = 0;

// the dfs should mark all reachable non zero nodes as visited and finally increment the counter
const dfs = (dict, islands, row, col) => {
    if (row < 0  || row >= islands.length) {
        return;
    }

    if (col < 0 || col >= islands[row].length) {
        return;
    }

    if (islands[row][col] === 0) {
        return;
    } 

    if (dict[row + ', ' + col] === true) {
        console.log(row, col, 'visited:' + dict[row + ', ' + col]);
        return;
    }
    
    // mark the thing as visited
    dict[row + ', ' + col] = true;
    console.log(row, col, 'visited:' + dict[row + ', ' + col]);

    dfs(dict, islands, row + 1, col);
    dfs(dict, islands, row - 1, col);
    dfs(dict, islands, row, col + 1);
    dfs(dict, islands, row, col - 1);

}

for (let row = 0; row < islands.length; row++) {
    for (let col = 0; col < islands[row].length; col++) {
        console.log(row, col);
        if (islands[row][col] > 0) {
            if (dict[row + ', ' + col] === true) {
                console.log(row, col, 'visited:' + dict[row + ', ' + col]);
                continue;
            } else {
                dfs(dict, islands, row, col);
                counter++;
            }
        } else {
            continue;
        }
    }
}



console.log(counter);