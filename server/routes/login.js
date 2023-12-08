// authController.js
const mongoose = require('mongoose');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Redirect to the appropriate dashboard based on the role
    if (user.role === 'admin') {
      res.redirect('/Admin-Dashboard');
    } else if (user.role === 'student') {
      res.redirect('/Student-Dashboard-main');
    } else if (user.role === 'teacher') {
      res.redirect('/Doctor-Dashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
