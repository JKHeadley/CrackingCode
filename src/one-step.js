function OneEditApart(s1, s2) {
  let offCount = 0;
  let i = 0;
  let j = 0;
  while (true) {
    if (i >= s1.length && j >= s2.length) {
      break;
    } else if (s1[i] === s2[j]) {
      i++;
      j++;
    } else if (i >= s1.length) {
      j++;
      offCount++
    } else if (j >= s2.length) {
      i++;
      offCount++;
    } else if (s1[i + 1] === s2[j]) {
      i++;
      offCount++;
    } else if (s2[j + 1] === s1[i]) {
      j++;
      offCount++
    } else if (s1[i + 1] === s2[j + 1]) {
      i++;
      j++;
      offCount++;
    } else {
      return false;
    }
    if (offCount > 1) {
      return false;
    }
  }
  return true;
}

let inputs = [
  ['cat', 'cats'],
  ['cat', 'ct'],
  ['cut', 'cats'],
  ['cut', 'at'],
  ['cat', 'dog'],
  ['cat', 'cast'],
  ['cat', 'act'],
  ['cat', 'catss'],
]

for (const input of inputs) {
  console.log("INPUT:", input, OneEditApart(...input))
}



