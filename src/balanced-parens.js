function balanceParens(input) {
  let balancedParens = [];
  let lastOpenIndex = [];
  input = input.split('');
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      lastOpenIndex.push(i);
    }
    else if (input[i] === ')') {
      if (lastOpenIndex[0] !== undefined) {
        balancedParens[lastOpenIndex.pop()] = true;
        balancedParens[i] = true;
      }
    }
  }

  for (let i = 0; i < input.length; i++) {
    if ((input[i] === '(' || input[i] === ')') && !balancedParens[i]) {
      input.splice(i, 1);
      balancedParens.shift();
    }
  }

  return input.join('');
}

let input = [
  'JUST(IN)',
  'JASP((A)L',
  'JASP(A)L)',
  '(JA))SPA(((L))',
]

for (const i of input) {
  console.log(i, balanceParens(i))
}
