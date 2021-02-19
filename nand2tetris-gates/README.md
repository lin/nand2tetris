1. xor

2. mux, dmux

3. mux4way16, mux8way16 is the best for demo tool based solving.

4. generic solution:

```javascript
let outPins = []

for (let i = 0; i < out.length; i++) {

  let inPins = [a, b, c, d]

  let inPinsWithNot = [
    [a, not(a)],
    [b, not(b)],
    [c, not(c)],
    [d, not(d)]
  ]

  // [a, b, notc, d] etc...
  let allPossibleCombination = permutation(inPinsWithNot)

  // if ([a, b, notc, d] == 1)
  let combinationThoseOutputOne = allPossibleCombination.filter(
    (combination) => out[i][combination] == 1
  )

  outPins[i] = orMultiWay(combinationThoseOutputOne)
}

return pins
```
