
function parensAreBalanced(str) {
    let openStack = [];


    // let isQuoted = false;
    for (let i=0; i<str.length; i++) {
        let char = str[i];

        if (isOpenParen(char)) {
            openStack.push(char);
        } else if (isCloseParen(char)) {
            let openChar = openStack.pop();
            if (isCloseOfOpen(openChar, char)) {
                continue;
            } else {
                return false;
            }
        }
    }

    return openStack.length === 0;
}

function isParen(char) {
    return isCloseParen(char) || isOpenParen(char);
}

function isOpenParen (char) {
    return char === '(' || char === '{' || char === '['
}

function isCloseParen (char) {
    return char === ')' || char === ']' || char === '}'
}

function isCloseOfOpen(openChar, closeChar ) {
    if (openChar === '(') {
        return closeChar === ')';
    }
    if (openChar === '{') {
        return closeChar === '}';
    }
    if (openChar === '[') {
        return closeChar === ']';
    }
}


(function test() {
    // let testString = '([abc(d)(efg)hi])'
    // let testString = '([abc(d)(efg)hi])'
    let testString = '([abcd)(efg)hi]'

    console.log('Checking String: ', testString);

    let isBalanced = parensAreBalanced(testString);
    console.log('String IS ' + (isBalanced ? '' : 'NOT ') + 'balanced');
})()
