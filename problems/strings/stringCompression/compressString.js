
function compressString(string) {
    let compressed = '';
    for (let i=0; i<string.length; i++) {
        let char = string[i];
        compressed += char;

        let occurrences = 1;
        while (string[i] ===  string[i + occurrences]) {
            occurrences++;
        }

        if (occurrences > 1) {
            compressed += occurrences.toString();
        }

        //skip the rest of occurrences in string
        i +=occurrences - 1;
    }

    return compressed;
}

(function test(str) {
    let testString = 'thisssss issss a snakesssss tesssst';
    console.log('Input String: ', testString);
    console.log('Compressed: ', compressString(testString));
})();
