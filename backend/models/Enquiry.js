const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'replied'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);