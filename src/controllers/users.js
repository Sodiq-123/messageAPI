const makeValidation = require('@withvoid/make-validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const { getUserById } = require('../utils/helpers')
const Message = require('../models/messages')

exports.createUser = async (req, res) => {
  try {
    let { name, email, password } = req.body
    const validate = makeValidation(types => ({
      payload: req.body,
      checks: {
        name: { type: types.string },
        email: { type: types.string },
        password: { type: types.string },
      }
    }))
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.errors
      })
    }
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }
    password = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not created'
      })
    }
    return res.status(201).json({
      success: true,
      message: 'User created',
      data: user
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// login a user
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body
    const validate = makeValidation(types => ({
      payload: req.body,
      checks: {
        email: { type: types.string },
        password: { type: types.string }
      }
    }))
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.errors
      })
    }
    const user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(user._id.toString(), process.env.SECRET_KEY) // create a token
      delete user.password
      return res.status(200).json({
        success: true,
        message: 'logged In successfully',
        data: { ...user.toJSON(), token }
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// delete a user
exports.deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
    const deletedUser = await User.findOneAndDelete(req.user._id)
    if (!deletedUser) {
      return res.status(400).json({
        success: false,
        message: 'User not deleted'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted',
      data: deletedUser
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const user = await getUserById(req.user)
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
    const messages = await Message.find({})
    if (messages) {
      return res.status(200).json({
        success: true,
        message: 'Messages fetched',
        data: messages
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Could not get messages'
    })
  }
}
