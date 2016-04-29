function convertToPigLatin(str) {
	return str.split(/([^\w'])/).map(processSentencePart).join('');
}

function processSentencePart(element) {
	// if it's a word, translate it. otherwise it's punctuation or whitespace so keep as is
	return /\w/.test(element) ? translateWord(element) : element;
}

function translateWord(word) {
	// the word gets split at the first vowel
	var firstVowel = firstVowelIndex(word);
	var part1 = word.substring(0, firstVowel);
	var part2 = word.slice(firstVowel);

	return matchCase(word, part2) + part1.toLowerCase() + 'ay';
}

// This function could be made more complex to handle 'y' as a vowel
function firstVowelIndex(word) {
	var firstVowel = word.search(/[aeiou]/i);

	// 'qu' is a special case
	if (word.charAt(firstVowel - 1).toLowerCase() === 'q') {
		return firstVowel + 1;
	} else {
		return firstVowel;
	}
}

// new word should match capitalization of original word
function matchCase(originalWord, wordPart) {
	var firstChar = originalWord.charAt(0);

	// if capitalized, capitalize the new beginning of the word
	if (firstChar === firstChar.toUpperCase()) {
		return wordPart.charAt(0).toUpperCase() + wordPart.slice(1);
	} else {
		return wordPart;
	}
}

// TESTS
console.assert(convertToPigLatin('hello') === 'ellohay');
console.assert(convertToPigLatin('eat') === 'eatay');
console.assert(convertToPigLatin('eat world') === 'eatay orldway');
console.assert(convertToPigLatin('Hello') === 'Ellohay');
console.assert(convertToPigLatin('Apples') === 'Applesay');
console.assert(convertToPigLatin('school') === 'oolschay');
console.assert(convertToPigLatin('eat... world?!') === 'eatay... orldway?!');
console.assert(convertToPigLatin('quick') === 'ickquay');
console.assert(convertToPigLatin('pig-latin') === 'igpay-atinlay');
console.assert(convertToPigLatin('Don\'t mess up contractions') === 'On\'tday essmay upay ontractionscay');
