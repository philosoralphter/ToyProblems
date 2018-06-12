
//Naive first answer: brute force
function consecutiveSubGroupsPossible(arr, size) {
    //see if we have the correct # of elements
    if (arr.length % size !== 0) { return false}

    arr = arr.slice(0); //copy our array so we can sort ti without messing up og array

    //first sort array:
    let sortedNums = arr.sort();

    //now see if we can build the groups
    let groups = [];
    let currentGroupIndex = 0;

    while (sortedNums.length > 0) {
        if (!groups[currentGroupIndex]) groups[currentGroupIndex] = [];

        let currentGroup = groups[currentGroupIndex];
        let foundNextItem = false;

        //if fresh group
        if (currentGroup.length === 0) {
            currentGroup.push(sortedNums.shift());
            foundNextItem = true;
            continue;
        }

        //check if any elements can be added to current group
        for (let i=0; i<sortedNums.length; i++) {
            //found a number to go next on group
            if (sortedNums[i]-1 === currentGroup[currentGroup.length-1]) {
                currentGroup.push(sortedNums.splice(i, 1)[0]);
                foundNextItem = true;
                break;
            }

            //passed viable numbers left in sorted array
            if (sortedNums[i] -1 > currentGroup[currentGroup.length-1]) {
                //could not complete a group
                return false;
            }
        }

        if (!foundNextItem) {
            return false;
        }

        if (currentGroup.length === size) currentGroupIndex++;
    }

    return true
}

(function test() {
    let testArr1 = [1,2,3,2,3,4,5,6,7]; //should be true with size === 3
    let testArr2 = [1,2,3,4,5,5,6,7,8,9]; //true with size = 5, false with size = 2

    console.log('Should be true: ', consecutiveSubGroupsPossible(testArr1, 3))
    console.log('Should be true: ', consecutiveSubGroupsPossible(testArr2, 5))
    console.log('Should be false: ', consecutiveSubGroupsPossible(testArr2, 2))
})()
