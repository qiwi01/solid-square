const User = require('../models/User');
const Property = require('../models/Property');

exports.addFavorite = async (req, res) => {
  const { propertyId } = req.body;
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: propertyId } });
  res.json({ message: 'Added to favorites' });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json(user.favorites);
};