
/*
You are building an educational website and want to create a simple calculator for students to use. The calculator will only allow addition and subtraction of positive integers.


We also want to allow parentheses in our input. Given an expression string using the "+", "-", "(", and ")" operators like "5+(16-2)", write a function to parse the string and evaluate the result.

Sample input:
    expression1 = "5+16-((9-6)-(4-2))"
    expression2 = "22+(2-4)"
 
Sample output:
    evaluate(expression1) => 20
    evaluate(expression2) => 20


*/

var expression1 = "5+16-((9-6)-(4-2))";
var expression2 = "22+(2-4)";

function calculate(input) {
  const subs = input.split('+')

  const adds = subs.map(s => {
    let nums = s.split('-')

    nums = nums.map(n => {
      return parseInt(n)
    })

    const total = nums.reduce(getDiff)

    return total
  })

  const result = adds.reduce(getSum)

  return result
}



function calcParens(input) {

  let newInput = input + ''

  while (true) {
    [nextExp, lastOpen, closed] = getNextExp(newInput)

    if (!nextExp) break

    console.log('nextExp', nextExp)
    console.log('lastOpen', lastOpen)
    console.log('closed', closed)

    const value = calculate(nextExp)

    const first = newInput.slice(0, lastOpen)

    const second = newInput.slice(closed + 1)

    console.log('value', value)
    console.log('first', first)
    console.log('second', second)

    newInput = first + value.toString() + second

    console.log('newInput', newInput)
  }


  return calculate(newInput)

}


function getNextExp(input) {
  let lastOpen = 0
  let closed = 0

  for (var i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      lastOpen = i
    }
    if (input[i] === ')') {
      closed = i
      const exp = input.slice(lastOpen + 1, closed)

      return [exp, lastOpen, closed]
    }
  }

  return [null]
}



function getSum(total, num) {
  return total + num;
}

function getDiff(total, num) {
  return total - num;
}

console.log(calcParens(expression2))