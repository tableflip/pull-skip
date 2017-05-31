# pull-skip [![Build Status](https://travis-ci.org/tableflip/pull-skip.svg?branch=master)](https://travis-ci.org/tableflip/pull-skip) [![dependencies Status](https://david-dm.org/tableflip/pull-skip/status.svg)](https://david-dm.org/tableflip/pull-skip)

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

----

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
