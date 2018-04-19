package uniq_chars

import (
	"testing"
	"fmt"
)

func TestUniqueChars (test *testing.T) {

	cases := []struct{
		input string
		want bool
	}{
		{"abcdefghijklmnopqrstuvwxyz", true},
		{"abcdefgfedcba", false},
	}

	for i, thisCase := range cases {
		if (IsAllUniqueChars(thisCase.input) != thisCase.want) {
			fmt.Printf("Failing: %d %s", i, thisCase)
			test.Errorf("Failed,  Case %d", i);
		}
	}
}

func TestUniqChars (test *testing.T) {

	cases := []struct{
		input string
		want bool
	}{
		{"abcdefghijklmnopqrstuvwxyz", true},
		{"abcdefgfedcba", false},
	}

	for i, thisCase := range cases {
		if (IsAllUniqChars(thisCase.input) != thisCase.want) {
			fmt.Printf("Failing: %d %s", i, thisCase)
			test.Errorf("Failed,  Case %d", i);
		}
	}
}
