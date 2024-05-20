import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import {Post, User} from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const userId = req.headers['userid']; // Retrieve userId from request headers
    console.log("user id in all pst get functin",userId);
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID not found in headers' });
    }

    // Find posts belonging to the signed-in user
    const userPosts = await Post.find({ user: userId });
    console.log("all user posts are ",userPosts);
    res.status(200).json({ success: true, data: userPosts });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching user posts failed, please try again' });
  }
});


router.route('/').post(async (req, res) => {
  var photoUrl = "";
  try {
    const { name, prompt, photo, userId } = req.body; // Extract userId from request body
    console.log(name+prompt+userId);
    photoUrl = await cloudinary.uploader.upload(photo);
   console.log("user id in post image i s",userId);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      user: userId // Associate the post with the userId received from the client
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.log(err);
    console.log(photoUrl);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    
  }
});


export default router;
