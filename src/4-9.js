const _ = require('lodash')

let count = 0

function buildArray ({ n = Node(), a = [], A = [] }) {
  count++
  let next = []
  a.push(n)
  next = next.concat(getNext({ n, a }))
  if (!next[0]) {
    A.push(a)
  } else {
    for (const i of next) {
      buildArray({ n: i, a: _.clone(a), A })
    }
  }
}

function getNext ({ n = Node(), a = [], prev = Node() }) {
  count++
  let next = []
  if (!a.includes(n)) {
    return [n]
  }
  if (n.parent && prev !== n.parent) {
    next = next.concat(getNext({ n: n.parent, a, prev: n }))
  }
  if (n.left && prev !== n.left) {
    next = next.concat(getNext({ n: n.left, a, prev: n }))
  }
  if (n.right && prev !== n.right) {
    next = next.concat(getNext({ n: n.right, a, prev: n }))
  }
  
  return next
}

const Node = (data, parent) => ({
  data,
  left: null,
  right: null,
  parent: parent
})


// build the tree (array)
const root = Node(20, null)

const ta = [[root]]

ta[1] = [Node(7, root), Node(21, root)]

ta[0][0].left = ta[1][0]
ta[0][0].right = ta[1][1]

ta[2] = [Node(1, ta[1][0]), Node(8, ta[1][0]), Node(40, ta[1][1])]

ta[1][0].left = ta[2][0]
ta[1][0].right = ta[2][1]
ta[1][1].right = ta[2][2]

ta[3] = [Node(5, ta[2][0]), Node(9, ta[2][1]), Node(10, ta[2][1]), Node(30, ta[2][2])]

ta[2][0].right = ta[3][0]
ta[2][1].left = ta[3][1]
ta[2][1].right = ta[3][2]
ta[2][2].left = ta[3][3]

let arrayOfLists = []

buildArray({ n: root, a: [], A: arrayOfLists})

console.log("Array:", arrayOfLists)
console.log("Size:", arrayOfLists.length)
console.log("COUNT:", count)