const mongoose = require('mongoose')
const validation = require('../../util/validation')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  articleId: { type: String },
  title: {
    type: String,
  },
  content: { type: String },
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  age: {
    type: Number,
    required: [true, '必须项'],
    min: [18, '自定义错误提示'],
    max: 60
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: `{PATH}是{VALUE},您必须确认您的性别`,
    },
    required: function () {
      return this.age < 50
    }
  },
  phone: {
    type: String,
    validate: {
      validator: validation.phone,
      message: `{PATH}必须是有效的11位数字`,
    },
    required: true
  },
  modifyOn: { type: Date, default: Date.now() },
})

mongoose.model('article', ArticleSchema)
