

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


        }
    }
}
