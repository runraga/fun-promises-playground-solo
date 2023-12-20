function pigLatin(str) {
  if (str.length === 0) return "";

  const words = str.split(" ");
  const latinisedWords = [];

  words.forEach((word) => {
    const startsWithVowel = /^[aeiou]/i.test(word);
    if (startsWithVowel) {
      latinisedWords.push(word + "way");
    } else {
      const startingConsonants = word.match(/^[^aeiou]+/i)[0];
      const restOfWord = word.slice(startingConsonants.length);
      latinisedWords.push(restOfWord + startingConsonants + "ay");
    }
  });
  return latinisedWords.join(" ");
}

module.exports = pigLatin;
