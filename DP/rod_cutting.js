// naive recurisive algorithm
function cut_rod(size, price_table) {
    let memoArr = Array(size).fill(null);
    function cut(rod_size) {
        if (memoArr[rod_size - 1]) {
            return memoArr[rod_size - 1];
        } else {
            if (rod_size === 0) {
                return 0;
            } else if (rod_size === 1) {
                return price_table[0];
            } else {
                let currMax = 0;
                let arr = Array(rod_size).fill(0);
                for (let i = 1; i < rod_size; i++) {
                    arr[i] = cut(i) + cut(rod_size - i);
                }
                // console.log(arr, arr.length, rod_size);
                currMax = Math.max(...[...arr, price_table[rod_size - 1]]);
                memoArr[rod_size - 1] = currMax;
                return currMax;
            }
        }
    }
    cut(size);
    console.log(memoArr);
    return memoArr[size - 1];
}


let price_table = [1,5,3,8,12,15,16,17];
let size = 4;
console.log(cut_rod(size, price_table));