package toyProblems

import "strings"
import "regexp"

func FindCommonChars (str1 string, str2 string) string {
   resultString := ""

   wordCharRegex, err := regexp.Compile("[a-zA-Z]")
   if err != nil {
     println("could not parse regexp")
   }

  for _, char := range str1 {
    if strings.ContainsRune(str2, char) && !strings.ContainsRune(resultString, char) && wordCharRegex.MatchString(string(char)){
      resultString += string(char)
    }
  }
  return resultString
}
