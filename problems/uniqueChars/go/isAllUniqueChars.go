package uniq_chars

import "fmt"

func IsAllUniqueChars (strings ...string) bool {
	//Save Time
	fmt.Println(strings)

	//Iterate all runes and keep track of each we've seen O(n)
	//MAP {runeVal: seen before}
	charCounts := make(map[rune] bool)

	for _, string := range strings {
		for _, letterRune := range string {
			if (charCounts[letterRune] == true /*&& letterRune != ' '*/) {
				return false;
			} else {
				charCounts[letterRune] = true;
			}
		}

	}
	return true;
}

func IsAllUniqChars (strings ...string) bool {
	//Save Space

	//for each string/char, check all other strings/chars for replica that
	// is NOT THIS INSTANCE lol

	//for each string
	for thisStringIndex, thisString := range strings {
		//for each rune in the string
		for thisRuneIndex, thisRune := range thisString {
			//check each string
			for compStringIndex, compString := range strings {
				//for this rune
				for compRuneIndex, compRune := range compString {

					if (!(thisStringIndex == compStringIndex &&
						thisRuneIndex == compRuneIndex) &&
						thisRune == compRune){
						return false
					}
				}
			}
		}
	}

	return true;
}

