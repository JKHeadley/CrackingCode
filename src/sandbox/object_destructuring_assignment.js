//see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
function returnMultiple (query, payload, request) {
  query.test = 'test'
  payload.test = 'test'

  return { payload, query }
}

let query = { type: 'query' }
let payload = { type: 'payload' }

//NOTE: the ';' is required to precede the assignment
;({ query, payload } = returnMultiple(query, payload, {}))

console.log("QUERY:", query)
console.log("PAYLOAD:", payload)