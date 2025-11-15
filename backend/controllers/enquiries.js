const Enquiry = require('../models/Enquiry');
const User = require('../models/User');
const Property = require('../models/Property');

exports.createEnquiry = async (req, res) => {
  try {
    const { propertyId, message } = req.body;
    const userId = req.user?.id;

    const enquiry = await Enquiry.create({
      userId: userId || null,
      propertyId,
      message
    });

    if (userId) {
      await User.findByIdAndUpdate(userId, { $push: { enquiries: enquiry._id } });
    }

    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const filter = {};
    if (req.user?.isAdmin) {
      // Admin sees all
    } else if (req.user?.id) {
      filter.userId = req.user.id;
    } else {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const enquiries = await Enquiry.find(filter)
      .populate('propertyId', 'title')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.replyEnquiry = async (req, res) => {
  try {
    const { reply } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: { text: reply, by: 'admin' } }, status: 'replied' },
      { new: true }
    );
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};