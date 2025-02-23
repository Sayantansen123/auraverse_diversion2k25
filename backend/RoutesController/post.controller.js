import Post from "../Models/post.model.js";
import mongoose from "mongoose";

export const postSave = async (req, res) => {
  try {
    const { description,  imageUrl, imageHash, pointsAwarded } = req.body;
    const userId = req.user._id; // Extracting userId from middleware

    

    const newPost = new Post({
      userId,
      description,
      imageUrl,
      imageHash,
      pointsAwarded: pointsAwarded || 0, // Default to 0 if not provided
    });

    const savedPost = await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};