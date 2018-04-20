const _ = require('lodash');
const quicksort = require('../../sorting-algorithms/quickSort/quickSortArray');


module.exports = detectPermutations;

function detectPermutations (str1, str2) {
    let srtd1 = str1.split('');
    let srtd2 = str2.split('');

    quicksort(srtd1);
    quicksort(srtd2);

    return srtd1.join('') ===  srtd2.join('');
}

function detectPermutationsNoSorting(str1, str2) {
    let str1Chars = countChars(str1);
    let str2Chars = countChars(str2);

    if (Object.keys(str1Chars).length !== Object.keys(str2Chars).length) {
        return false;
    } else {
        for (let char in str1Chars) {
            if (str1Chars.hasOwnProperty(char) && str1Chars[char] !== str2Chars[char]) return false;
        }
        return true;
    }


    function countChars (str) {
        let count = {};
        for (let char in str) {
            //initialize
            count[char] = count[char] || 0;
            //increment
            count[char]++;
        }

        return count;
    }

}

let str1 = "cdeflkjh";
let str2 = "dcefhjkl";

console.log( detectPermutationsNoSorting(str1, str2));
