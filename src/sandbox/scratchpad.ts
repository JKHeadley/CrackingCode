function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (A[0] === undefined) {
    return 1
  }
  A.sort((a,b) => parseInt(a) - parseInt(b))
  for (const [index,num] of A.entries()) {
    if (A[index + 1] > num + 1) {
      if (num + 1 <= 0) {
        return 1
      }
      return num + 1
    }
  }

  if (A[A.length - 1] + 1 <= 0) {
    return 1
  }
  return A[A.length - 1] + 1
}

let inp = [2];

console.log(solution(input))