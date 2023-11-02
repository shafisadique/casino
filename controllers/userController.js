// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

exports.login = async (req, res) => {
  const { code, password } = req.body;

  try {
    const user = await User.findOne({ code });
    console.log(user.password)

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    console.log('Provided Password:', password);
    console.log('Stored Password:', user.password);

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);
    console.log('Password Match:', isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign({ sub: user.code }, secretKey, { expiresIn: '7d' });

    res.json({
      name: user.name,
      id: user._id,
      code: user.code,
      coin: user.coin,
      token,
      role: user.role,
      msg: 'Login Success',
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
