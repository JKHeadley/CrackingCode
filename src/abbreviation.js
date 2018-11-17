// Complete the abbreviation function below.
function abbreviation(a, b) {

  let found = true
  for (const c of b.split('')) {
    console.log("ISU:", b, c)

    if (isUpper(c)) {
      [a, found] = checkForNext(a, c)
      if (!found) {
        break
      }
    } else {
      [a, found] = checkForNextLower(a, c)
      if (!found) {
        break
      }
    }
  }

  console.log("FOUND:", found)
  return found ? 'YES' : 'NO'

}

function checkForNext(a, c) {
  console.log("CHECKU:", a, c)
  const aCopy = a.split('')
  for (const aChar of a.split('')) {
    aCopy.shift()
    if (aChar === c || aChar.toUpperCase() === c) {
      return [aCopy.join(''), true]
    }
  }
  return [[], false]
}

function checkForNextLower(a, c) {
  console.log("CHECKL:", a, c)
  const aCopy = a.split('')
  for (const aChar of a.split('')) {

    aCopy.shift()
    if (aChar === c) {
      return [aCopy.join(''), true]
    }
  }
  return [[], false]
}

function isUpper(c) {
  return c === c.toUpperCase()
}

let a = "beFgH"
let b = "EFG"

console.log(abbreviation(a, b))