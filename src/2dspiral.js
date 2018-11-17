function spiral (n) {
  const set = new Set()
  const arr2d = []
  let done = false
  let count = 1
  let i = 0
  let j = 0
  if (n === 1) return [[1]]
  while (!done) {
    done = true
    while (!set.has(`${i}${j}`) && i < n) {
      set.add(`${i}${j}`)
      if (!arr2d[i]) arr2d[i] = []
      arr2d[i][j] = count
      count++
      i++
      done = false
    }
    i--
    j++
    while (!set.has(`${i}${j}`) && j < n) {
      set.add(`${i}${j}`)
      arr2d[i][j] = count
      count++
      j++
      done = false
    }
    j--
    i--
    while (!set.has(`${i}${j}`) && i >= 0) {
      set.add(`${i}${j}`)
      arr2d[i][j] = count
      count++
      i--
      done = false
    }
    i++
    j--
    while (!set.has(`${i}${j}`) && i >= 0) {
      set.add(`${i}${j}`)
      arr2d[i][j] = count
      count++
      j--
      done = false
    }
    j++
    i++
  }
  return arr2d
}

function print2DArray(arr) {
  for (const a of arr) {
    console.log(a);
  }
}

print2DArray(spiral(1))