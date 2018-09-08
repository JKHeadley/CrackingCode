
function generateMatrix(M, N) {
  let matrix = []
  for (let i=0; i < M; i++) {
    matrix.push([])
    for (let j=0; j < N; j++) {
      matrix[i].push(Math.floor(Math.random() * 10))
    }
  }
  return matrix
}

let matrix = generateMatrix(7,5)

for (let i = 0; i < matrix.length; i++) {
  console.log(matrix[i])
}

console.log("THE MATRIX:")

zeroMat(matrix)

for (let i = 0; i < matrix.length; i++) {
  console.log(matrix[i])
}


function zeroMat(matrix) {
  const M = matrix.length
  const N = matrix[0].length
  let rows = {}
  let cols = {}

  for (let i=0; i < M; i++) {
    for (let j=0; j < N; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true
        cols[j] = true
      }
    }
  }

  for (const i in rows) {
    setRowZero(matrix, i)
  }
  for (const j in cols) {
    setColZero(matrix, j)
  }

  return matrix
}

function setRowZero(matrix, i) {
  let N = matrix[0].length

  for (let j=0; j < N; j++) {
    matrix[i][j] = 0
  }
}

function setColZero(matrix, j) {
  let M = matrix.length

  for (let i=0; i < M; i++) {
    matrix[i][j] = 0
  }
}


