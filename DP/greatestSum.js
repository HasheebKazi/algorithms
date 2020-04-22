/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function(nums) {
    
    // given an array of integers find the maximum sum of these elements divisible by 3;
    let dpArr = new Array(nums.length).fill(0);
    let maxSumSize1 = Math.max(...(nums.filter(n => n % 3 === 0)));
    if (maxSumSize1) {
        dpArr[0] = maxSumSize1;
    } else {
        dpArr[0] = 0;
    }
    let dict = new Map();
    dict.set(dpArr[0], true);
    console.log(dict);
    
    const maxSum = (size) => {
        if (size === 0) {
            return 0;
        }
        if (size === 1) {
            return dpArr[0];
        }
        
        // now we have k elements and we want the maximum sum divisible by 3 of a given size;
        let values = [];
        console.log('-----------------------')
        for (let i = 0; i < nums.length; i++) {
            if (!dict.get(nums[i])) {
                console.log(nums[i], dict.get(nums[i]));
                values.push([nums[i], nums[i] + maxSum(size - 1)]);
            }
        }
        console.log('values after compute', values);
        values = values.filter(n => n[1] % 3 === 0);
        let max;
        if (values) {
            max = values[0];
            for (let i = 1; i < values.length; i++) {
                if (values[i][1] > max[1]) {
                    max = values[i];
                }
            }
            console.log('max after compute', max);
            if (max) {
                if (max[1] > dpArr[size - 1]){
                    dict.set(max[0], true);
                    dpArr[size - 1] = max[1];
                } 
            }
            console.log('dparr after compute', dpArr);
            return dpArr[size - 1];
        } else {
            dpArr[size - 1] = dpArr[size - 2];

            return dpArr[size - 1];
        }


    }
    
    maxSum(nums.length);
    console.log('DParr', dpArr);
    console.log(dict);
    
};

maxSumDivThree([3,6,5]);