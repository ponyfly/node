const mongoose = require('mongoose')
const validation = require('../../util/validation')
const plugin = require('../../util/plugin') // 插件


const Schema = mongoose.Schema
// 默认情况下，验证器都是只有save操作才会触发 但是在Mongoose 4.x后，我们也可以开启update()和findoneandupdate()的验证器，只需将runValidators设为true(默认是false)
const ArticleSchema = new Schema({
  articleId: { type: String },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  content: { type: String },
  author: {
    type: String,
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  age: {
    type: Number,
    required: [true, '必须项'],
    min: [18, '自定义错误提示'],
    max: 60,
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{PATH}是{VALUE},您必须确认您的性别',
    },
    required() {
      return this.age < 50
    },
  },
  phone: {
    type: String,
    validate: {
      validator: validation.phone,
      message: '{PATH}必须是有效的11位数字',
    },
    required: true,
  },
  modifyOn: { type: Date, default: Date.now() },
})
ArticleSchema.plugin(plugin.lastModified, { index: true }) // 插件

mongoose.model('article', ArticleSchema)
