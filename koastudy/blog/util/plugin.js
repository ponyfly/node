function lastModified(schema, options) {
  schema.add({ lastMod: Date })
  schema.pre('save', function (next) {
    console.log('pre', options.index)
    this.lastMod = new Date()
    next()
  })
  schema.pre('updateOne', function (next) {
    console.log('preupdeta', options.index)
    this.lastMod = new Date()
    next()
  })
}

module.exports = {
  lastModified,
}
