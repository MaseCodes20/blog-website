const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: [true, "Post title is required"],
    },
    image: {
      type: String,
    },
    content: {
      type: String,
    },
    categories: {
      type: Array,
    },
    comments: [
      {
        userId: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now, set: (v) => v.Date.now() },
      },
    ],
    likes: [
      {
        userId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
