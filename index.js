function skipBytes (n) {
  var skipped = false
  var buffer = Buffer.from([])

  function skipRead (read, abort, cb) {
    read(abort, function (err, data) {
      if (err) return cb(err)
      if (skipped) return cb(null, data)

      buffer = Buffer.concat([buffer, data])

      if (buffer.length <= n) {
        return skipRead(read, abort, cb)
      }

      skipped = true
      cb(null, buffer.slice(n))
      buffer = null
    })
  }

  // a sink function: accept a source
  return function (read) {
    // but return another source!
    return function (abort, cb) {
      skipRead(read, abort, cb)
    }
  }
}

module.exports = skipBytes
