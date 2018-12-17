const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CitySchema = new Schema({
  province: String,
  city: String,
  person: Number,
  industry: Array,
})
const UserModel = mongoose.model('user')
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
    .unwind('$industry')
    .match({ 'industry.name': 'IT' })
    .group({ _id: '$province', itTotal: { $sum: '$industry.person' }, city: { $push: '$city'} })
    .match({ itTotal: { $gt: 400} })
    .exec(function(err, result) {
      console.log(result)
    })
}

function sortPerson() {
  CityModel
    .aggregate()
    .sort({ 'person': 1 })
    .project({
      _id: 0,
      province: 1,
      person: 1,
      city: 1,
    })
    .exec(function(err, result) {
      console.log(result)
    })
}

function limitSkip() {
  // 随机返回10条，从第三条数据开始，返回一条数据
  CityModel
    .aggregate()
    .sample(10)
    .skip(2)
    .limit(6)
}

function lookUp() {
  // 联表
  UserModel
    .aggregate()
    .lookup({
      from: 'articles',
      localFiled: 'name',
      foreignFiled: 'author',
      as: 'userArticle',
    })
    .project({
      _id: 0,
      name: 1,
      'userArticle.title': 1,
      'userArticle.author': 1,
    })
    .match({ name: '张三' })
}


// getCityGtThousand()
getItPerson()
