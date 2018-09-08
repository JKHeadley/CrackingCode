const assert = require('assert')

const Node = ({ data = 0 } = {}) => ({
  data,
  adjacent: [],
  visited: false
})

const Graph = () => {
  const nodes = []

  function findRoute({ start = Node(), finish = Node(), reverse = false } = {}) {
    const q = [start]

    start.visited = true

    // breadth first search
    while (q.length > 0) {
      const current = q.pop()

      for (const node of current.adjacent) {
        if (!node.visited) {

          console.log("VISITING:", node.data)
          if (node === finish) {
            return true
          }

          node.visited = true
          q.unshift(node)
        }
      }
    }

    if (reverse) {
      return false
    }

    clearVisited()
    return findRoute({ start: finish, finish: start, reverse: true })
  }

  function clearVisited() {
    for (const node of nodes) {
      node.visited = false
    }
  }


  return {
    nodes,
    findRoute
  }
}

const g = Graph()

// initialize the graph
for (let i = 0; i <= 8; i++) {
  g.nodes.push(Node({ data: i }))
}

// populate the graph
g.nodes[0].adjacent = [g.nodes[1], g.nodes[2]]
g.nodes[1].adjacent = []
g.nodes[2].adjacent = [g.nodes[1], g.nodes[3]]
g.nodes[3].adjacent = [g.nodes[5], g.nodes[0]]
g.nodes[4].adjacent = [g.nodes[3]]
g.nodes[5].adjacent = [g.nodes[4]]
g.nodes[6].adjacent = [g.nodes[7]]
g.nodes[7].adjacent = []
g.nodes[8].adjacent = [g.nodes[7]]

const foundRoute = g.findRoute({ start: g.nodes[1], finish: g.nodes[3] })

console.log("FOUND:", foundRoute)