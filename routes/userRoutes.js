// routes/userRoutes.js

import express from 'express';
const router = express.Router();
//const User = require('../models/User');
import {User} from '../mongodb/models/post.js';
// Signup route
//import { setCookie } from 'nookies'; // Assuming you are using nookies for cookie handling

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    // Check password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    // Return userId upon successful signin
    res.status(200).json({ message: 'Signin successful', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// // Signin route
// router.post('/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }
//     // Check password
//     if (user.password !== password) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }
//     // Set cookie or JWT token and send response
//     res.status(200).json({ message: 'Signin successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });
export default router;
