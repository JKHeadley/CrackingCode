const _ = require('lodash')

let count = 0

function allSequences ({ n = Node() }) {
  count++

  let result = []

  if (n === null) {
    result.push([])
    return result
  }

  const prefix = []
  prefix.push(n.data)

  /* Recurse left and right subtrees */
  const leftSeq = allSequences({ n: n.left })
  const rightSeq = allSequences({ n: n.right })

  /* Weave together each list from the left and right sides */
  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved = []
      weaveLists({ first: left, second: right, results: weaved, prefix })
      result = result.concat(weaved)
    }
  }

  return result
}

/* Weave lists together in all possible ways. This algorithm works by removing the
 * head from one list, recursing, and then doing the same thing with the other
 * list.
 */
function weaveLists ({ first = [], second = [], results = [], prefix = []}) {
  count++

  /* One list is empty. Add remainder to [a cloned] prefix and store result. */
  if (first.length === 0 || second.length === 0) {
    let result = _.clone(prefix)
    result = result.concat(first)
    result = result.concat(second)
    results.push(result)
    return
  }

  /* Recurse with head of first added to the prefix. Removing the head will damage
   * first, so we'll need to put it bback where we found it afterwards.
   */
  const headFirst = first.shift()
  prefix.push(headFirst)
  weaveLists({ first, second, results, prefix })
  prefix.pop()
  first.unshift(headFirst)

  /* Do the same thing with second, damaging and then restoring the list. */
  const headSecond = second.shift()
  prefix.push(headSecond)
  weaveLists({ first, second, results, prefix })
  prefix.pop()
  second.unshift(headSecond)
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

let arrayOfLists = allSequences({ n: root })

console.log("Array:", arrayOfLists)
console.log("Size:", arrayOfLists.length)
console.log("COUNT:", count)