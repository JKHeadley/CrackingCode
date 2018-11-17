function lookSay(digits) {
  const result = [];
  const dArr = digits.split('');
  let count = 1;
  for (const [index, digit] of dArr.entries()) {
    if (dArr[index + 1] === digit) {
      count++;
    } else {
      result.push(count);
      result.push(digit);
      count = 1;
    }
  }
  return result.join('');
}

function lookSaySequence(n, digits = '1') {
  for (let i = 0; i < n; i++) {
    console.log(digits);
    digits = lookSay(digits);
  }
}

lookSaySequence(20, '11131113111');