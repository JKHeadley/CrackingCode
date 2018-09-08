function buildOrder ({projects = [], dependencies = []}) {
  Graph({dependencies})
  const q = []
  for (const p of projects) {
    if (p.state !== Node.states.DONE) {
      queueDependencies({p, q})
    }
  }
  return q
}

function queueDependencies ({p = Node(), q = []}) {
  if (p.state === Node.states.PROCESSING) {
    throw new Error('Circular dependency found.')
  }
  p.state = Node.states.PROCESSING
  for (const d of p.dependencies) {
    if (d.state !== Node.states.DONE) {
      queueDependencies({p: d, q})
    }
  }
  q.push(p)
  p.state = Node.states.DONE
}

// Connect the nodes of the graph based on the dependency list
const Graph = ({dependencies = []} = {}) => {
  for (const pair of dependencies) {
    pair[1].dependencies.push(pair[0])
  }
}

const Node = ({data}) => ({
  data,
  dependencies: [],
  state: Node.states.NULL,
})

Node.states = Object.freeze({
  'NULL': Symbol('null'),
  'PROCESSING': Symbol('processing'),
  'DONE': Symbol('done'),
})

// const projects = [
//   Node({data: 'a'}),
//   Node({data: 'b'}),
//   Node({data: 'c'}),
//   Node({data: 'd'}),
//   Node({data: 'e'}),
//   Node({data: 'f'})
// ]

const projects = [
  Node({data: 'a'}),
  Node({data: 'b'}),
  Node({data: 'c'}),
  Node({data: 'd'}),
  Node({data: 'e'}),
  Node({data: 'f'}),
  Node({data: 'g'}),
  Node({data: 'h'}),
]

const projectDict = projects.reduce((prev, current) => {
  prev[current.data] = current
  return prev
}, {})

// const dependencies = [
//   [projectDict.a, projectDict.d],
//   [projectDict.f, projectDict.b],
//   [projectDict.b, projectDict.d],
//   [projectDict.f, projectDict.a],
//   [projectDict.d, projectDict.c],
//   // [projectDict.b, projectDict.a],
//   // [projectDict.c, projectDict.b],
// ]

const dependencies = [
  [projectDict.f, projectDict.c],
  [projectDict.f, projectDict.a],
  [projectDict.f, projectDict.b],
  [projectDict.c, projectDict.a],
  [projectDict.b, projectDict.a],
  [projectDict.b, projectDict.e],
  [projectDict.b, projectDict.h],
  [projectDict.a, projectDict.e],
  [projectDict.d, projectDict.g],
  // [projectDict.e, projectDict.f],
]

const queue = buildOrder({projects, dependencies})

console.log('Queue:', queue)