require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const makeValidation = require('@withvoid/make-validation')
const Contact = require('../models/contacts')
const Message = require('../models/messages')

exports.sendMessageToNumber = async (req, res) => {
  try {
    let { message, phoneNumber } = req.body
    const validate = makeValidation(types => ({
      payload: req.body,
      checks: {
        message: { type: types.string },
        phoneNumber: { type: types.string }
      }
    }))
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.errors
      })
    }
    // send message to a random number
    let sendMessage = await client.messages.create(
      {
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      })
    if (sendMessage) {
      const message = await Message.create({ message: sendMessage.body })
      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'message not saved'
        })
      }
    }
    return res.status(200).json({
      success: true,
      message: 'message sent successfully',
      data: sendMessage
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// Send message to a saved contact
exports.sendMessageToContact = async (req, res) => {
  try {
    let { message } = req.body
    const { contactId } = req.params
    const validate = makeValidation(types => ({
      payload: req.body,
      checks: {
        message: { type: types.string },
      }
    }))
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.errors
      })
    }
    // send message to contacts number
    let contact = await Contact.findOne({_id: req.params.contactId})
    if (!contact) {
      return res.status(400).json({
        success: false,
        message: 'contact not found'
      })
    }
    let sendMessage = await client.messages.create(
      {
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: contact.phoneNumber
      })
    if (message) {
      return res.status(200).json({
        success: true,
        message: 'message sent successfully',
        data: sendMessage
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}