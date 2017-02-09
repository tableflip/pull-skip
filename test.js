const test = require('tape')
const pull = require('pull-stream')
const skipBytes = require('./')

const zeros = (n) => Buffer.alloc(n)
const ones = (n) => Buffer.alloc(n, 1)

test('should skip correctly below first chunk', (t) => {
  t.plan(6)

  pull(
    pull.values([zeros(3), ones(3)]),
    skipBytes(2),
    pull.collect((err, data) => {
      t.ifError(err, 'no error skipping bytes')
      data = Buffer.concat(data)
      t.equal(data.length, 4, 'data is correct length')
      t.equal(data[0], 0, 'data[0] is correct')
      t.equal(data[1], 1, 'data[1] is correct')
      t.equal(data[2], 1, 'data[2] is correct')
      t.equal(data[3], 1, 'data[3] is correct')
      t.end()
    })
  )
})

test('should skip correctly above first chunk', (t) => {
  t.plan(3)

  pull(
    pull.values([zeros(3), ones(3)]),
    skipBytes(5),
    pull.collect((err, data) => {
      t.ifError(err, 'no error skipping bytes')
      data = Buffer.concat(data)
      t.equal(data.length, 1, 'data is correct length')
      t.equal(data[0], 1, 'data[0] is correct')
      t.end()
    })
  )
})

test('should skip correctly at first chunk', (t) => {
  t.plan(5)

  pull(
    pull.values([zeros(3), ones(3)]),
    skipBytes(3),
    pull.collect((err, data) => {
      t.ifError(err, 'no error skipping bytes')
      data = Buffer.concat(data)
      t.equal(data.length, 3, 'data is correct length')
      t.equal(data[0], 1, 'data[0] is correct')
      t.equal(data[1], 1, 'data[1] is correct')
      t.equal(data[2], 1, 'data[2] is correct')
      t.end()
    })
  )
})
