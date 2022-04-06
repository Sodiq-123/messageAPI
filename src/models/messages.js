const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  message: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
})


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;