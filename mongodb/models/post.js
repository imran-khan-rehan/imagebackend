import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
 // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // Add posts field to store post references
});

const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
 // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add user field to store user reference
 user: { type: String, required: true },

});

const Post = mongoose.model('Post', postSchema);

export { User, Post }; // Export both models
