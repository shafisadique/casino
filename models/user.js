// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  code: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  coin: { type: Number },
  role: {
    type: String,
    enum: ['ADMIN', 'PROVIDER', 'CLIENT'],
    required: true,
  },
});
// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
