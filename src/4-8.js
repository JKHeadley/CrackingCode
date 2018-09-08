
function findCommonAncestor ({ n1 = Node(), n2 = Node(), t = Tree() }) {
  const r = t.root
  const path1 = []
  const path2 = []
  findPath({ n: n1, path: path1, r })
  findPath({ n: n2, path: path2, r })

  return findLastCommon({ path1, path2 })
}

function findPath ({ n = Node(), path = new Map(), r = Node() }) {
  if (!r) {
    return false
  }
  if (n === r) {
    return true
  }
  path.push(r)
  if (findPath({ n, path, r: r.left }) || findPath({ n, path, r: r.right })) {
    return true
  } else {
    path.pop()
    return false
  }
}

function findLastCommon({ path1 = [], path2 = [] }) {
  let index = 0
  let commonAncestor = Node()
  while (path1[index] === path2[index] && path1[index] && path2[index]) {
    commonAncestor = path1[index]
    index++
  }
  return commonAncestor
}

const Node = (data) => ({
  data,
  left: null,
  right: null
})

const Tree = ({ root = Node() }) => {
  return {
    root
  }
}

// build the tree
const root = Node(1)

const treeArray = [[root]]

treeArray[1] = [Node(2), Node(3)]

treeArray[0][0].left = treeArray[1][0]
treeArray[0][0].right = treeArray[1][1]

treeArray[2] = [Node(4), Node(5), Node(6)]

treeArray[1][0].left = treeArray[2][0]
treeArray[1][0].right = treeArray[2][1]
treeArray[1][1].right = treeArray[2][2]

treeArray[3] = [Node(7), Node(8), Node(9)]

treeArray[2][0].right = treeArray[3][0]
treeArray[2][1].right = treeArray[3][1]
treeArray[2][2].right = treeArray[3][2]

treeArray[4] = [Node(10), Node(11), Node(12)]

treeArray[3][0].left = treeArray[4][0]
treeArray[3][0].right = treeArray[4][1]
treeArray[3][2].left = treeArray[4][3]

treeArray[5] = [Node(13), Node(14), Node(15), Node(16)]

treeArray[4][0].left = treeArray[5][0]
treeArray[4][1].left = treeArray[5][1]
treeArray[4][1].right = treeArray[5][2]
treeArray[4][2].right = treeArray[5][3]

const t = Tree({ root })

const cA = findCommonAncestor({ n1: treeArray[5][1], n2: treeArray[5][2], t })

console.log("COMMON ANCESTOR:", cA)