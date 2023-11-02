const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const userRoutes = require('./routes/userRoutes');
const registrationController = require('./routes/registrationRoutes');
// Replace this connection string with the one provided by MongoDB Atlas
// const dbUri = 'mongodb+srv://<username>:<password>@clustername.mongodb.net/yourDBName';
const dbUri = `mongodb+srv://shafisadique123:shafisadique123@cluster0.brlacya.mongodb.net/casino?ssl=true&tls=true
`;
app.use(express.json());
app.use('/login', userRoutes);
app.use('/register',registrationController)
app.get("/good", (req, res) => res.send("API Running"));
app.use(bodyParser.json());
// router.post('/register', userController.register);

// const dbUri = process.env.MONGODB_URI;
// Connect to MongoDB Atlas
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


// ...rest of your code
