// backend/createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@solidsquare.com';
    const adminPassword = 'admin123'; // Change after first login!
    const adminName = 'SolidSquare Admin';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      if (existingAdmin.isAdmin) {
        console.log('Admin already exists.');
      } else {
        await User.updateOne({ email: adminEmail }, { isAdmin: true });
        console.log('User upgraded to admin.');
      }
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('ADMIN CREATED SUCCESSFULLY');
    console.log('Email: admin@solidsquare.com');
    console.log('Password: admin123');
    console.log('Login at: /admin');
    console.log('');
    console.log('SECURITY TIP: Change password immediately after login!');

    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();