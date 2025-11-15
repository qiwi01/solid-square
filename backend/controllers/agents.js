const Agent = require('../models/Agent');
const Property = require('../models/Property');

exports.getAgents = async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
};

exports.getAgent = async (req, res) => {
  const agent = await Agent.findById(req.params.id).populate('listings');
  if (!agent) return res.status(404).json({ message: 'Not found' });
  res.json(agent);
};