/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

 

function createObject(str){
  let strHash = {}

  for(let i=0;i < str.length;i++){
    if(strHash[str[i]]){
      strHash[str[i]] += 1;
    }
    else{
      strHash[str[i]] = 1;
    }
  }
  
  return strHash;
}

function isAnagram(str1, str2) {
  const str1Hash = createObject(str1.toLowerCase());
  const str2Hash = createObject(str2.toLowerCase());
  const keys1 = Object.keys(str1Hash);
  const keys2 = Object.keys(str2Hash);
  if (keys1.length != keys2.length){
    return false;
  }

  for (let key in str1Hash){
    if(str1Hash[key] != str2Hash[key]){
      return false;
    }
  }
  return true;

}


module.exports = isAnagram;
