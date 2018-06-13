function binarySearchRecursive(arr, target, comparator, lo, hi) {
    //comparator should return positive if args[1] is larger than args[2], negative if smaller, 0 if equal,
    if (!comparator) {
        comparator = function (elem1, elem2) {
            return elem1 - elem2;
        }
    }
    lo = lo || 0;
    hi = hi || arr.length -1;

    if (lo > hi) {
        return -1;
    }


    let midpoint = Math.floor((lo + hi) /2);
    let comparison = comparator(arr[midpoint], target);

    if (comparison === 0) {
        return midpoint;
    }

    if (comparison < 0) {
        return binarySearchRecursive(arr, target, comparator, midpoint+1, hi)
    }

    if (comparison > 0) {
        return binarySearchRecursive(arr, target, comparator, lo, midpoint-1)
    }

}

function binarySearchIterative(arr, target, comparator, lo, hi) {
    if (!comparator) {
        comparator = function (elem1, elem2) {
            return elem1 - elem2;
        }
    }
    lo = lo || 0;
    hi = hi || arr.length - 1;

    while (lo <= hi) {
        let midpoint = Math.floor((lo+hi)/2);
        let comparison = comparator(arr[midpoint], target);

        if (comparison === 0) {
            return midpoint;
        }
        if (comparison > 0) {
            hi = midpoint-1;
        }
        if (comparison < 0) {
            lo = midpoint +1;
        }
    }

    return -1;
}


(function test(){
    let numsArray = [1,2,3,4,5,6,7,8,9,10,11, 13, 14];
    console.log('\n recursive: ');
    console.log('Finding Index of 2 in ', numsArray, ' Found at index: ', binarySearchRecursive(numsArray, 2));
    console.log('Finding Index of 11 in ', numsArray, ' Found at index: ', binarySearchRecursive(numsArray, 11));
    console.log('Finding Index of 12 in ', numsArray, ' Found at index: ', binarySearchRecursive(numsArray, 12));

    console.log('\n iterative: ');
    console.log('Finding Index of 2 in ', numsArray, ' Found at index: ', binarySearchIterative(numsArray, 2));
    console.log('Finding Index of 11 in ', numsArray, ' Found at index: ', binarySearchIterative(numsArray, 11));
    console.log('Finding Index of 12 in ', numsArray, ' Found at index: ', binarySearchIterative(numsArray, 12));

    // let wordsArray()
})();
