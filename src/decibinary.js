

// Complete the decibinaryNumbers function below.
function decibinaryNumbers(x) {
  const dbCount = [];
  const dbList = new Map()
  let count = 0
  let place = 1
  let decimal = 0
  let db = 0

  if (dbCount[x - 1]) {
    return dbCount[x - 1]
  }
  let dbDecimal = 0
  while (count < x) {

    dbDecimal = evalDB(db)
    if (dbDecimal === decimal) {
      console.log("COUNT:", count)
      addToList(dbList, place, db)
      dbCount.push(db)
      count++
      [place, decimal] = getNextPlace(place, decimal, false)
    } else if (dbDecimal < decimal) {
      [place, decimal] = getNextPlace(place, decimal, false)
    } else {
      [place, decimal] = getNextPlace(place, decimal, true)
    }

    db = getFromList(dbList, place)
  }

  // return last element of dbCount, which is the xth decibinary number
  return dbCount[dbCount.length - 1]

}

function evalDB(decimal) {
  let dbDecimal = decimal.toString().split('').reverse().reduce((total, num, i) => {
    return total + parseInt(num) * Math.pow(2,i);
  }, 0)

  return dbDecimal
}

function addToList(dbList, place, db) {
  if (!dbList.has(place)) {
    dbList.set(place, [])
  }
  const placeList = dbList.get(place)
  placeList.push(db)
  dbList.set(place, placeList)
}

function getFromList(dbList, place) {
  if (!dbList.has(place)) {
    return place
  }
  let placeList = dbList.get(place)
  return placeList[placeList.length - 1] + 1
}

// Get the next "index" in the hashMap and increase the decimal "target" if all
function getNextPlace(place, decimal, next) {
  let digits = numDigits(place)
  if (digits === 1) {
    if (next || decimal === 9) {
      return [10, decimal]
    }
    if (decimal === 0) {
      return [1, 1]
    } else if (decimal === 1) {
      return [1, 2]
    } else {
      return [1, decimal]
    }
  }
  // Check if we've reached the end of this decimal. e.g. place = 100, 1000, 10000, etc
  if (next &&
    mostSignificantDigit(place, digits) === 1 &&
    place % Math.pow(10, digits - 1) === 0
  ) {
    return [nextLeastPlace(decimal + 1), decimal + 1]
  } else if (
    next
  ) {
    return [increasePlace(place, digits), decimal]
  }
  let mod = 10;
  for (let i = 0; i < digits; i++) {
    if (place % mod === 0) {
      return [place + mod, decimal]
    }
    mod *= 10
  }
}

function increasePlace(place, digits) {
  let filter = 10
  for (let i = 1; i <= digits; i++) {
    let remainder = place % filter
    place = (place / filter)>>0
    if (remainder !== 0) {
      if (i === digits) {
        return Math.pow(filter, i)
      }
      return (place + 1) * Math.pow(filter, i)
    }
  }
}

function nextLeastPlace(decimal) {
  if (decimal < 10) {
    return 1
  }
  let binPlace = 0
  let numAtPlace = 1
  let val = 1
  while (val < decimal) {
    val = numAtPlace * Math.pow(2, binPlace)
    numAtPlace++
    if (numAtPlace === 10) {
      numAtPlace = 1
      binPlace++
    }
  }

  return increasePlace(val, numDigits(val))
}

function numDigits(x) {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}

function mostSignificantDigit(num, digits) {
  return num / Math.pow(10, digits - 1)
}

let input = "4592999\n" +
  "9055498\n" +
  "8529790"

input = input.split('\n')

for (let x of input) {
  console.log(x, decibinaryNumbers(x))
}