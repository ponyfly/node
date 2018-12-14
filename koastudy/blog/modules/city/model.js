const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CitySchema = new Schema({
  province: String,
  city: String,
  person: Number,
  industry: Array,
})

const CityModel = mongoose.model('city', CitySchema)

function getCityGtThousand() {
  CityModel
    .aggregate()
    .group({ _id: '$province', totalPerson: { $sum: '$person' } })
    .match({ totalPerson: { $gt: 1000 } })
    .exec(function(err, res) {
      console.log(res)
    })
}

function getItPerson() {
  CityModel
    .aggregate()
    .unwind('industry')
    .match({ 'industry.name': 'IT' })
    .group({ _id: '$province', itTotal: { $sum: '$industry.person' }, city: { $push: '$city' } })
    .match({ itTotal: { $gt: 400 } })
    .exec(function (err, res) {
      console.log(res)
    })
}

// getCityGtThousand()
getItPerson()
