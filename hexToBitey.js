/* Hexadecimal converter:
  Given the test object and dictionary write a function that will be able to translate
  hexadecimal strings to "bitey", a more easy to read, english sounding
  version, based on the popular show Silicon Valley.
*/

var dictionary = {
  0: ['', ''],
  1: ['Eleventy', 'One'],
  2: ['Twenty', 'Two'],
  3: ['Thirty', 'Three'],
  4: ['Forty', 'Four'],
  5: ['Fifty', 'Five'],
  6: ['Sixty', 'Six'],
  7: ['Seventy', 'Seven'],
  8: ['Eighty', 'Eight'],
  9: ['Ninety', 'Nine'],
  A: ['Atta', 'Ay'],
  B: ['Bibbity', 'Bee'],
  C: ['City', 'See'],
  D: ['Dickety', 'Dee'],
  E: ['Ebbity', 'Eee'],
  F: ['Fleventy', 'Eff']
};

var tests = {
  '0xA0': 'Atta',
  '0xF5': 'Fleventy-Five',
  '0xBB': 'Bibbity-Bee',
  '0x0008': 'Eight',
  '0xF5BB': 'Fleventy-Five bitey Bibbity-Bee',
};

function hexToBitey(input) {
  input = input.split('x')[1];

  var bytes = [];

  for (var x = 0; x < input.length; x += 2) {
    var byte = input.substr(x, 2);
    bytes.push(translate(byte));
  }

  return bytes.reduce(addToFinal, '');
}

function addToFinal(str, byte) {
  if (str !== '' && byte !== '') {
    return str += ' bitey ' + byte;
  } else {
    return str += byte;
  }
}

function translate(byte) {
  if(byte.charAt(0) === '1') {
    return dictionary['1'][1][byte.charAt(1)];
  } else {
    var char1 = dictionary[byte.charAt(0)][0];
    var char2 = dictionary[byte.charAt(1)][1];

    return char1 && char2 ? char1 + '-' + char2 : char1 + char2;
  }
}

function test(key) {
  console.log(hexToBitey(key) + ' should be ' + tests[key]);
}

Object.keys(tests).forEach(test);
