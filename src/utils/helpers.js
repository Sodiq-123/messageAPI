const User = require('../models/users')

exports.getUserById = async (id) => {
  const user = await User.findOne({_id: id})
  return user
}