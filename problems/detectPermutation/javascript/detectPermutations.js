const _ = require('lodash');
const quicksort = require('../../sorting-algorithms/javascript/quickSort');


module.exports = detectPermutations;

function detectPermutations (str1, str2) {
    let srtd1 = str1.split('');
    let srtd2 = str2.split('');

    quicksort(srtd1);
    quicksort(srtd2);

    return srtd1.join('') ===  srtd2.join('');
}

function detectPermutationsNoSorting(str1, str2) {
    let str1Chars = {};
    let str2Chars = {};



}

let str1 = "cdeflkjh";
let str2 = "dcefhjkl";

console.log( detectPermutations(str1, str2));
