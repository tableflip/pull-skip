# pull-skip

Skip the first n bytes of your [pull stream](https://www.npmjs.com/package/pull-stream).

## Example

```js
const pull = require('pull-stream')
const skipBytes = require('pull-skip')

const zeros = (n) => Buffer.alloc(n)
const ones = (n) => Buffer.alloc(n, 1)

pull(
  // stream in bytes <Buffer 00 00 00 01 01 01>
  pull.values([Buffer.concat([zeros(3), ones(3)])]),
  skipBytes(2),
  pull.collect((err, data) => {
    if (err) throw err
    console.log(Buffer.concat(data)) // <Buffer 00 01 01 01>
  })
)
```
