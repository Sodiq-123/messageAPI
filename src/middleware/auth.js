const jwt = require('jsonwebtoken')
const { getUserById } = require('../utils/helpers')
require('dotenv').config()

exports.verifyToken = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  try {
    const token = authHeaders.split(' ')[1]
    const userId = jwt.verify(token, process.env.SECRET_KEY)
    const user = await getUserById(userId)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Token'
      })
    }
    // delete user.password
    req.user = userId
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
