const Property = require('../models/Property');
const Agent = require('../models/Agent');

exports.getProperties = async (req, res) => {
  try {
    const query = {};
    const { location, priceMin, priceMax, bedrooms, type, furnished, rentSale, featured } = req.query;

    if (location) query.location = new RegExp(location, 'i');
    if (priceMin || priceMax) query.price = { ...(priceMin && { $gte: +priceMin }), ...(priceMax && { $lte: +priceMax }) };
    if (bedrooms) query.bedrooms = +bedrooms;
    if (type) query.type = type;
    if (furnished !== undefined) query.furnished = furnished === 'true';
    if (rentSale) query.rentSale = rentSale;
    if (featured) query.featured = featured === 'true';

    const properties = await Property.find(query).populate('agentId', 'name contact');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agentId');
    if (!property) return res.status(404).json({ message: 'Not found' });
    property.views += 1;
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const { title, description, price, location, bedrooms, type, furnished, rentSale, video, lat, lng, agentId, featured } = req.body;
    const images = req.files?.map(f => `/uploads/${f.filename}`) || [];

    const property = await Property.create({
      title, description, price, location, bedrooms, type,
      furnished: furnished === 'true', rentSale, video,
      map: lat && lng ? { lat: +lat, lng: +lng } : null,
      agentId, images, featured: featured === 'true'
    });

    await Agent.findByIdAndUpdate(agentId, { $push: { listings: property._id } });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files) updates.images = [...(await Property.findById(req.params.id)).images, ...req.files.map(f => `/uploads/${f.filename}`)];

    const property = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};