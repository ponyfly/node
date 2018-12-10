const mongoose = require('mongoose')
const util = require('../../util/util')

const ArticleModel = mongoose.model('article')

function add(req, res) {
  const article = new ArticleModel(Object.assign({ articleId: util.randomId() }, req.body))
  article.save((err, result) => {
    if (err) {
      console.log(err.errors)
      return res.status(400).send({
        errMsg: err,
      })
    }
    res.json({
      errCode: 0,
      errMsg: '新增成功',
      articleId: result.articleId,
    })
  })
}

function remove(req, res) {
  const { articleId } = req.body
  if (!articleId) {
    return res.status(400).send({
      errMsg: '请上传id',
    })
  }
  ArticleModel.deleteOne({ articleId }, (err, result) => {
    if (err) {
      return res.status(400).send({
        errMsg: '删除失败',
      })
    }
    if (result.n) {
      res.json({
        errCode: 0,
        errMsg: '删除成功',
      })
    } else {
      res.json({
        errCode: -1,
        errMsg: '文章不存在',
      })
    }
  })
}

function update(req, res) {
  const { articleId } = req.body
  if (!articleId) {
    return res.status(400).send({
      errMsg: '请上传id',
    })
  }
  delete req.body.articleId
  const opts = { runValidators: true }
  ArticleModel.updateOne({ articleId }, req.body, opts, (err, result) => {
    if (err) {
      return res.status(400).send({
        errMsg: err,
      })
    }
    console.log(result)
    if (result.nModified) {
      res.json({
        errCode: 0,
        errMsg: '更新成功',
      })
    } else {
      res.json({
        errCode: 0,
        errMsg: '更新失败',
      })
    }
  })
}

function find(req, res) {
  const { articleId } = req.query
  if (!articleId) {
    return res.status(400).send({
      errMsg: '请上传id',
    })
  }
  ArticleModel.findOne({ articleId }, (err, result) => {
    if (err) {
      return res.status(400).send({
        errMsg: '查找失败',
      })
    }
    res.json({
      errCode: 0,
      errMsg: '查找成功',
      data: result,
    })
  })
}

module.exports = {
  add,
  remove,
  update,
  find,
}
