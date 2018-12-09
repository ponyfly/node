function phone(v) {
  return /1[3|5|6|7|8]\d{9}/.test(v)
}

module.exports = {
  phone,
}