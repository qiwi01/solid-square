const Property = require('../models/Property');
const Enquiry = require('../models/Enquiry');

exports.getAnalytics = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalViews = await Property.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]);
    const totalLeads = await Enquiry.countDocuments();

    const mostViewed = await Property.find().sort({ views: -1 }).limit(5).select('title views');
    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5).populate('propertyId', 'title');

    res.json({
      totalProperties,
      totalVisits: totalViews[0]?.total || 0,
      totalLeads,
      mostViewed,
      recentLeads: recentEnquiries
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};