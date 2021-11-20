const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    max: 14
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;