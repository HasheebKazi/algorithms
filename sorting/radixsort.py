# OLD STYLE INTEGER SORT without lists

# we will sort integers in the range 0 to 10,000

def integer_sort(arr):
    # calculate number of buckets needed to sort and allocate them
    countingArr = [0]*10001;

    # count each integer
    for i in range(len(arr)):
        countingArr[arr[i]] = countingArr[arr[i]] + 1;

    # count number of integers less than or equal to each integer
    for j in range(1, len(countingArr)):
        countingArr[j] = countingArr[j] + countingArr[j-1];
        
    # use the previous list to place each integer into its valid container
    outputArr = [0]*(len(arr));
    for index in range(len(arr) - 1, -1, -1):
        outputArr[countingArr[arr[index]] - 1] = arr[index];
        countingArr[arr[index]] = countingArr[arr[index]] - 1;
    
    return outputArr;

def radix_sub(arr, column):
    # calculate number of buckets needed to sort and allocate them
    countingArr = [0]*10001;

    # count each integer
    for i in range(len(column)):
        countingArr[column[i]] = countingArr[column[i]] + 1;
    # count number of integers less than or equal to each integer
    for j in range(1, len(countingArr)):
        countingArr[j] = countingArr[j] + countingArr[j-1];
    
    # use the previous list to place each integer into its valid container
    outputArr = [0]*(len(column));
    for index in range(len(column) - 1, -1, -1):
        outputArr[countingArr[column[index]] - 1] = arr[index];
        # print('outputArr', index, column[index], arr[index]);
        countingArr[column[index]] = countingArr[column[index]] - 1;
    
    return outputArr;

def radix_sort(arr):
    print('  input:', arr);
    # each of our numbers has d digits, d = 5 in this case
    digColumnArr = None;
    outputArr = arr;
    for i in range(5):
        digColumnArr = [0]*len(arr);
        for j in range(len(arr)):
            digColumnArr[j] = (outputArr[j] % 10**(i+1)) // 10**i
        outputArr = radix_sub(outputArr, digColumnArr);
        print(digColumnArr);
        print('ioutput:', outputArr);
    # print(' output:', outputArr);
    return outputArr;



def sort_validation(arr):
    for i in range(1, len(arr)):
        if arr[i] < arr[i-1]:
            return False;
    return True;














# arr = [5073, 7553, 6330, 3805, 7267, 3629, 7006, 5256, 4109, 7127, 8383, 5283, 498, 6749, 302, 4385, 2985, 8154, 7905, 7386, 8496, 7252, 1070, 9262, 901, 5433, 6121, 8918, 9799, 183, 6788, 7927, 1521, 9891, 9413, 3963, 5373, 9439, 1064, 9864, 8456, 8958, 3893, 1598, 3952, 5397, 1852, 3845, 722, 7642, 1843, 6827, 9603, 1122, 7520, 9959, 3171, 7352, 8209, 3280, 8342, 1181, 4452, 9379, 8231, 5862, 8043, 3690, 8183, 9390, 8649, 7161, 3776, 2952, 7082, 4874, 1611, 9002, 9782, 4764, 6257, 6761, 244, 3475, 4151, 1408, 2949, 55, 620, 1153, 4469, 5571, 7147, 3420, 2063, 5592, 9119, 8655, 9821, 6174];

arr = [5073, 7553, 6330, 3805, 7267, 3629, 7006, 5256, 4109, 7127];
print(radix_sort(arr));

# print(integer_sort(arr));
# print('valid sorted order:', sort_validation(integer_sort(arr)));