var makeValidation = require('@withvoid/make-validation')
var Contact = require('../models/contacts')

exports.createContact = async (req, res) => {
  try {
    let { name, phoneNumber } = req.body
    const userId = req.user._id
    const validate = makeValidation(types => ({
      payload: req.body,
      checks: {
        name: { type: types.string },
        phoneNumber: { type: types.string },
      }
    }))
    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: validate.errors
      })
    }
    const contact = await Contact.findOne({ name: name })
    if (contact) {
      return res.status(400).json({
        success: false,
        message: 'Contact already exists'
      })
    }

    const newContact = await Contact.create({ userId, name, phoneNumber })
    if (newContact) {
      return res.status(201).json({
        success: true,
        message: 'Contact created successfully',
        data: newContact
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

// get a single contact
exports.getContactByName = async (req, res) => {
  try {
    const contact = await Contact.findOne({ name: req.params.name })
    if (contact) {
      return res.status(200).json({
        success: true,
        message: 'Contact found',
        data: contact
      })
    }
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
}


exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({name: req.params.name})
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    const deleteContact = await Contact.findOneAndDelete({name: req.params.name})
    if (deleteContact) {
      return res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
        data: deleteContact
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({})
    if (contacts) {
      return res.status(200).json({
        success: true,
        message: 'Contacts found',
        data: contacts
      })
    }
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
}

exports.updateContact = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body
    const contact = await Contact.findOneAndUpdate({name: req.params.name}, req.body)
    if (contact) {
      return res.status(200).json({
        success: true,
        message: 'Contact updated successfully',
        data: contact
      })
    }
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
}