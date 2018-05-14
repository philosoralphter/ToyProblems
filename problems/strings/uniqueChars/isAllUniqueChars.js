

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

function isAllUniqueCharsSmall(...strings) {
    for (let i = 0; i < strings.length; i++) {
        for (let j = 0; j < strings[i].length; j++) {
            let char = strings[i][j];

            for (let k = i; k < strings.length; k++) {
                for (let l = j+1; i < strings[k].length; l++) {
                    let otherChar = strings[k][l];
                    if (char === otherChar) return false;
                }
            }
        }
    }

    return true;
}

(function test() {
    let string1 = 'abcdefghijklmnopqrstuvwxyz';
    let string2 = 'abc';
    let string3 = 'def';
    let string4 = 'def';

    console.log(isAllUniqueCharsFast(string4, string3, string2))

})();
