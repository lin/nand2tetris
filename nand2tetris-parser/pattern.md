### Parser Patterns

---------

1. `B -> { A* }`

```javascript
B.body = []
while(!eat('}')) {
  B.body.push(parse(A))
}
```

2. `B -> { A+ }`

```javascript
do {
  B.body.push(parse(A));
} while (!eat('}'))
```

3. `B -> { A (',' A)* }`

```javascript
B.body = []

let first = true
do {
  first ? first = false : expect(',')
  B.body.push(parse(A));
} while (!eat('}'))
```

4. `B -> A (C)?`

```javascript
B.body.push(parse(A))
if ( eat(first(C)) ) {
  B.body.push(parse(C))
}
```

5. `B -> A C*`

```javascript
B.body.push(parse(A))
while (eat( first(C) )) {
  B.body.push(parse(C))
}
```


6. `B -> A C? ';'`

```javascript
parse(A)
if (!eat(';')) {
  parse(C)
  B.body.push(A + C)
  expect(';')
}
B.body.push(A)
```

7. `B -> B (op A)* | A` : no precedence, left associative

```javascript
firstA = parse(A)
B = recursive(firstA)
function recursive(a) {
  if (eat(op)){
    parse(A)
    B1 = A + op + A
    return recursive(B1)
  }
  return a
}
```

8. `A-> a | b | bc | B; B -> bd | be` : no precedence, left associative

```javascript
switch(token) {
  case a:
    break
  case b:
    switch (lookahead) {
      case c:
        break
      case d:
      case e:
        parse(B)
        break
    }
}
```
