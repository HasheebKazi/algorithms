class Matrix {
    constructor(size, min, max) {
        this.matrix = this.createSquareMatrix(size, min, max);
        this.size = size;
    }

    createSquareMatrix(size, min, max) {
        let matrix = [];
        let counter = 1;
        for (let row = 0; row < size; row++) {
            matrix.push([]);
            for (let col = 0; col < size; col++) {
                // matrix[row].push(this.randomInt(min, max));
                matrix[row].push(counter);
                counter ++;
            }
        }
        return matrix;
    }
    
    randomInt(min, max) {
        return Math.floor(Math.random()*(max+1-min)) + min;
    }

    printMatrix() {
        console.log(this.matrix);
    }

    rotateClockWise(n) {
        // make a copy of each of the arrays of the other column
        let currentLayer = this.size-1;
        let stopper = this.size;
        let start = 0;
        for (let yy = 0; yy < n; yy++) {
            currentLayer = this.size-1;
            stopper = this.size;
            start = 0;
            for (let h = this.size; h > 1; h -= 2) {
                const top = [];
                const bot = [];
                const left = [];
                const right = [];

                // generate the top arr of the currrent layer
                for (let i = start; i < stopper; i++) {
                    top.push(this.matrix[this.size-currentLayer-1][i]);
                }
                // generate the right later
                for (let i = start; i < stopper; i++) {
                    right.push(this.matrix[i][currentLayer]);
                }
                for (let i = start; i < stopper; i++) {
                    bot.push(this.matrix[currentLayer][i]);
                }
                for (let i = start; i < stopper; i++) {
                    left.push(this.matrix[i][this.size-currentLayer-1]);
                }

                // console.log('before rotation')
                // console.log('c', currentLayer, '========')
                // console.log('t', top);
                // console.log('l', left);
                // console.log('b', bot);
                // console.log('r', right);
                let counter = 0;
                for (let i = start; i < stopper; i++) {
                    this.matrix[this.size-currentLayer-1][i] = left[counter];
                    counter++;
                }
                counter = 0;
                for (let i = start; i < stopper; i++) {
                    this.matrix[i][currentLayer] = top[counter];
                    counter++;
                }

                counter = right.length - 1;
                // console.log("rgt", right);
                // console.log("bot", bot);

                for (let i = start; i < stopper; i++) {
                    this.matrix[currentLayer][i] = right[counter];
                    counter--;
                }

                counter = 0;
                for (let i = start; i < stopper; i++) {
                    this.matrix[i][this.size-currentLayer-1] = bot[counter];
                    counter++;
                }

                stopper -= 1;
                start++;
                currentLayer -= 1;
            }
            this.printMatrix();
        }

    }
}

let arr2d = new Matrix(4, 1, 10);
arr2d.printMatrix();
arr2d.rotateClockWise(4);
// arr2d.printMatrix();

