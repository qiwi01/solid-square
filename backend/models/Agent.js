const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  contact: {
    phone: String,
    email: String,
    whatsapp: String
  },
  portfolio: [String]
});

module.exports = mongoose.model('Agent', agentSchema);