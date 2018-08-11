const assert = require('assert')

const Node = (data) => ({
  data,
  next: null
})

const Stack = () => {
  let top, size = 0

  function push(node) {
    assert(node, 'node not defined')
    assert(node.data, 'node must included data')

    if (top) {
      node.next = top
    }
    top = node
    size++
  }

  function pop() {
    assert(top, 'stack is empty')
    let node = top
    top = top.next
    node.next = null
    size--
    return node
  }

  return Object.freeze({
    push,
    pop,
    peek: () => top,
    size: () => size
  })
}

const SetOfStacks = ({ maxSize = 3 } = {}) => {
  const set = Stack()

  function push(node) {
    let top = set.peek()
    if (set.size() === 0 || top.data.size() >= maxSize) {
      top = Node(Stack())
      set.push(top)
    }
    top.data.push(node)
  }

  function pop() {
    let top = set.peek()
    assert(top, 'stack is empty')
    const value = top.data.pop()

    if (top.data.size() === 0) {
      set.pop()
    }

    return value
  }

  function popAt(index) {
    assert(set.size() > index, 'index outside of range')

    let node = set.peek()

    for (let i = 0; i < index; i++) {
      node = node.next
    }

    return node.data.pop()
  }

  return Object.freeze({
    push,
    pop,
    popAt,
    peek: () => set.peek().data.peek(),
    size: () => set.size(),
    maxSize: () => maxSize
  })
}


const s = Stack()

// s.push(Node(1))
// s.push(Node(2))
// s.push(Node(3))

// console.log(s.peek())
// console.log(s.pop())
// console.log(s.peek())
// console.log(s.size())

const sos = SetOfStacks({ maxSize: 3 })

sos.push(Node(1))
sos.push(Node(2))
sos.push(Node(3))
sos.push(Node(4))
sos.push(Node(5))

console.log(sos.popAt(1))

console.log(sos.peek())
sos.pop()
sos.pop()
sos.pop()
console.log(sos.peek())
console.log(sos.size())



