const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  type: { type: String, required: true },
  furnished: { type: Boolean, default: false },
  rentSale: { type: String, enum: ['rent', 'sale'], required: true },
  status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
  images: [{ type: String }],
  video: { type: String },
  map: { lat: Number, lng: Number },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  views: { type: Number, default: 0 },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);