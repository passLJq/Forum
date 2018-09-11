
exports.addCondition = function (query) {
  let str = '1=1'
  for (let key in query) {
    str += ` and ${key}='${query[key]}'`
  }
  return str
}

exports.updateCondition = function (body) {
  let str = ''
  for (let key in body) {
    str += ` ${key}='${body[key]}',`
  }
  str = str.substr(0, str.length-1)
  return str
}
