/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const str1 = str.toLowerCase();
  let finalstr = '';
  for(let i=0;i<str1.length;i++){
    if(str1.charCodeAt(i) >= 97 && str1.charCodeAt(i) <= 122){
      finalstr += str1[i];
    }
  }

  let reversestr = '';
  for(let i=finalstr.length-1;i>-1;i--){
    reversestr += finalstr[i];
  }

    return finalstr == reversestr;
  }

module.exports = isPalindrome;
