const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  console.log(secretKey);
  const { code, password, role, name, coin } = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!password.match(passwordRegex)) {
    return res.status(400).json({
      msg: 'Password must be at least 8 characters, contain one lowercase letter, one uppercase letter, and one digit.',
    });
  }
  try {
    const existingUser = await User.findOne({ code });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // console.log('This is Salt',salt);
    // console.log('This is Salt',hashedPassword);

    // Create a new user with the specified role
    const newUser = new User({
      code,
      password: hashedPassword,
      role, // Set the role based on user input
      name,
      coin,
    });

    // Save the user to the database
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ sub: newUser.code }, secretKey, { expiresIn: '7d' });

    res.status(201).json({
      name: newUser.name,
      id: newUser._id,
      code: newUser.code,
      coin: newUser.coin,
      token,
      role: newUser.role,
      msg: 'Registration Success',
      status: true,
    });
  } catch (error) {
    res.status(500).json({ msg: `Server Error ${error}` });
  }
};
