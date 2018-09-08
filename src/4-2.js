const assert = require('assert')

const Node = ({ data = 0 } = {}) => {
  const self = {
    data,
    left: null,
    right: null
  }

  function copy({ node = Node() } = {}) {
    self.data = node.data
    self.left = node.left
    self.right = node.right
  }

  return Object.assign(self, {
    copy
  })

}

const Tree = () => {
  const self = {
    root: Node()
  }

  function buildTree({ sorted = [] } = {}) {
    self.root = buildTreeRecursive({ sorted })
  }

  // function buildTreeRecursive({ sorted = [] } = {}) {
  //   if (sorted.length === 1) {
  //     return Node({ data: sorted[0] })
  //   }
  //   const mid = Math.floor(sorted.length / 2)
  //   const parent = Node({ data: sorted[mid] })
  //
  //   parent.left = buildTreeRecursive({ sorted: sorted.slice(0, mid) })
  //   parent.right = buildTreeRecursive({ sorted: sorted.slice(mid + 1, sorted.length) })
  //
  //   return parent
  // }

  function buildTreeRecursive({ sorted = [], start = null, end = null } = {}) {
    if (start === null) {
      start = 0
      end = sorted.length - 1
    }

    if (start >= end) {
      return Node({ data: sorted[start] })
    }

    const mid = Math.floor((end + start) / 2)
    const parent = Node({ data: sorted[mid] })

    parent.left = buildTreeRecursive({ sorted, start, end: mid - 1 })
    parent.right = buildTreeRecursive({ sorted, start: mid + 1, end })

    return parent
  }

  return Object.assign(self, {
    buildTree,
  })
}

const t = Tree()

const sorted = [3, 6, 7, 11, 13, 15, 20, 21]

t.buildTree({ sorted })

console.log("TREE:", t)