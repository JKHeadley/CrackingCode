/**
 Rabin-Karp substring search
 **/


function rbSearch(txt, pat) {
  // d = num of potential chars
  const d = 256
  const N = txt.length
  const M = pat.length

  const h = Math.pow(d,(M-1))

  // s is hash of text (window size M)
  // p is hash of pattern
  let s = 0
  let p = 0

  /**
   * Calculate the initial hash values.
   * The has is the numeric representation of the window text with base d
   * Ex: 'cat' = ascii('c') * 256^2 + ascii('a') * 256^1 + ascii('t') * 256^0
   */
  for (let i = 0; i < M; i++) {
    s = s + txt[i].charCodeAt() * Math.pow(d,(M-1-i))
    p = p + pat[i].charCodeAt() * Math.pow(d,(M-1-i))
  }

  for (let i = 0; i < N - M; i++) {
    if (s === p) {
      testMatch(txt, pat, i, M)
    }

    s = (s - txt[i].charCodeAt() * h) * d + txt[i + M].charCodeAt()
  }
}

function testMatch(txt, pat, i, M) {
  for (let x = i; x < i + M; x++) {
    if (txt[x] !== pat[x - i]) {
      return
    }
  }

  console.log("Pattern found at index: ", i)
}


// TEST

const txt = "GEEKS FOR GEEKS"
const pat = "GEEK"

rbSearch(txt, pat)