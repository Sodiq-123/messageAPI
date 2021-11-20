var makeValidation = require('@withvoid/make-validation')
var Contact = require('../models/contacts')

exports.createContact = async (req, res) => {
  try {
    let { name, phoneNumber } = req.body
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
    const contact = await Contact.create({name, phoneNumber})
    if (contact) {
      return res.status(201).json({
        success: true,
        message: 'Contact created successfully',
        data: contact
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
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({_id: req.params.id})
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

// delete a contact by id
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({_id: req.params.id})
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }
    const deletedContact = await Contact.findOneAndDelete({_id: req.params.id})
    if (deletedContact) {
      return res.status(200).json({
        success: true,
        message: 'Contact deleted successfully',
        data: deletedContact
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
    const contacts = await Contact.find()
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

// update a contact by id
exports.updateContact = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body
    const contact = await Contact.findOneAndUpdate({_id: req.params.id}, req.body)
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