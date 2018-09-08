/*
Remove Dups: Write code to remove duplicates from an unsorted linked list.
FOLLOW UP
How would you solve this problem if a temporary buffer is not allowed?
*/


const Node = (value) => {
  return {
    value,
    next: null
  }
}

const LinkedList = () => {
  let head, current, previous, last

  const add = (node) => {
    if (!head) {
      head = node
      last = node
      current = node
    } else {
      last.next = node
      last = node
    }
  }

  const next = () => {
    if (current) {
      previous = current
      current = current.next
    }
  }


  const removeCurrent = () => {
    if (current === head) {
      head = current.next
    }
    if (previous && current.next !== head) {
      previous.next = current.next
    }
    current = current.next
  }


  return {
    add,
    next,
    current: () => current,
    reset: () => current = head,
    removeCurrent
  }
}

function generateLL() {
  const ll = LinkedList()

  ll.add(Node(3))
  ll.add(Node(3))
  ll.add(Node(3))
  ll.add(Node(1))
  ll.add(Node(2))
  ll.add(Node(3))
  ll.add(Node(4))
  ll.add(Node(3))
  ll.add(Node(5))
  ll.add(Node(3))
  ll.add(Node(4))
  ll.add(Node(3))
  ll.add(Node(3))
  ll.add(Node(7))

  return ll
}

let ll = generateLL()


while (ll.current()) {
  console.log(ll.current().value)
  ll.next()
}
console.log()

ll.reset()


function removeDuplicates(ll) {
  let hash = {}

  // populate hash with duplicates
  while (ll.current()) {
    let current = ll.current().value
    if (hash[current] === undefined) {
      hash[current] = 0
    } else {
      hash[current] = hash[current] + 1
    }
    ll.next()
  }

  ll.reset()

  console.log("HASH:", hash, '\n')

  while (ll.current()) {
    let current = ll.current().value

    if (hash[current] > 0) {
      ll.removeCurrent()
      hash[current] = hash[current] - 1
    } else {
      ll.next()
    }

  }

  ll.reset()

  return ll
}


function removeDuplicatesNoBuffer(ll) {
  while (ll.current()) {
    removeValues(ll.current())
    ll.next()
  }
  ll.reset()
  return ll
}

function removeValues(node) {
  let stat = node
  let prev = node

  node = node.next

  while (node) {
    if (node.value === stat.value) {
      prev.next = node.next
      node = node.next
    } else {
      node = node.next
      prev = prev.next
    }
  }
}

removeDuplicatesNoBuffer(ll)

while (ll.current()) {
  console.log(ll.current().value)
  ll.next()
}


/*
let hash
- for each node in list
  - store node value in hash

- for each node in list
 - remove node if value is in hash


*/

