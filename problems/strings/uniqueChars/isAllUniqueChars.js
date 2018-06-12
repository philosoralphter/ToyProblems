
//O(n) space, O(n)time
function isAllUniqueCharsFast (...strings) {
    let seenChars = {};

    for (let i=0; i<strings.length; i++) {
        for (let j=0; j<strings[i].length; j++) {
            let char = strings[i][j];
            if (seenChars[char] === true) {
                return false
            } else {
                seenChars[char] = true;
            }
        }
    }

    return true;
}

//O(1) Space, O(n!) time
function isAllUniqueCharsSmall(...strings) {
    for (let i = 0; i < strings.length; i++) {
        for (let j = 0; j < strings[i].length; j++) {
            let char = strings[i][j];


            for (let  k=i; k<strings.length; k++){
                for (let l= (k===i ? j+1 : 0); l<strings[k].length; l++) {
                    if (char === strings[k][l]) return false;
                }
            }
        }
    }

    return true;
}

(function test() {

    let strings1 = ['abc', 'def','ghi','jkl'];
    let strings2 = ['abc', 'cde','efg','ghi'];

    console.log('Testing strings1 fast (should be true): ', isAllUniqueCharsFast(...strings1));
    console.log('Testing strings1 small (should be true): ', isAllUniqueCharsSmall(...strings1));

    console.log('Testing strings2 fast (should be false): ', isAllUniqueCharsFast(...strings2));
    console.log('Testing strings2 small (should be false): ', isAllUniqueCharsFast(...strings2));

})()
