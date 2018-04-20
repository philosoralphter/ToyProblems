module.exports = quicksort;

function quicksort (arr, iMin, iMax) {
    iMin = iMin || 0;
    iMax = iMax === undefined ?  arr.length-1 : iMax;

    if (iMin < iMax){
        //Run Partitioning
        let pivot = partition(arr, iMin, iMax);
        quicksort(arr, iMin, pivot - 1);
        quicksort(arr, pivot + 1, iMax);
    }
}

// Hoare Partition Scheme
function partition(arr, first, last) {
    let pivotValue = arr[first];
    let ltCursor = first, rtCursor = last;

    while (true) {

        //find lt cursor lower than or equal to pivot
        while (arr[ltCursor] < pivotValue) {
            ltCursor++;
        }

        //find rt Cursor higher than or equal to pivot
        while (arr[rtCursor] > pivotValue) {
            rtCursor--;
        }

        //return meeting point if
        if (ltCursor >= rtCursor) {
            return rtCursor;
        }

        swap(arr, ltCursor, rtCursor);
    }
}

function swap(arr, i1, i2) {
    // console.log('Swapping: ', arr, i1, i2);
    let mem = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = mem;
    return arr;
}


// let arr1 = [9,8,7,6,5,4,3,2,1];
// let arr2 = [9,8,7,6,5,4,3,2];
// let arr3 = [2,3,4,1,5,0];
// let str = ['a','c','b']
//
// quicksort(str);
// console.log(str);
