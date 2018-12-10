const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  name: String,
  age: Number,
  address: {
    city: String,
    street: String,
  },
})

const UserModel = mongoose.model('user', UsersSchema)

const address = UsersSchema.virtual('address.full')

address.get(function () {
  return this.address.city + ' ' + this.address.street;
})
address.set(function (v) {
  const split = v.split(' ')
  this.address.city = split[0]
  this.address.street = split[1]
})

// const body = {
//   name: 'abcd',
//   phone: '13123123123',
//   age: 20,
//   sex: 'male',
// }
// const user = new UserModel(body)
// user.address.full = 'beijing 100号'
// user.save()
