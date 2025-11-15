const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addFavorite, getFavorites } = require('../controllers/users');

router.post('/favorites', auth, addFavorite);
router.get('/favorites', auth, getFavorites);

// backend/routes/users.js
router.put('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!(await user.matchPassword(oldPassword))) {
    return res.status(400).json({ message: 'Old password incorrect' });
  }

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});

module.exports = router;