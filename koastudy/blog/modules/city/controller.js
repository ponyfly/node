const mongoose = require('mongoose')

const userModel = mongoose.model('user')

function findAddress(req, res) {
  userModel.findById(req.query.id, (err, result) => {
    if (err) {
      return err.status(400).send({
        message: '用户不存在',
      });
    }
    console.log(result.address)
    res.json(result.address.full)
  })
}

module.exports = {
  findAddress,
}
