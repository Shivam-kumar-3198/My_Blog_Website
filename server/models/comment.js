import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true, // Faster lookups by blog
    },
    name: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    isApproved: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

// Index for faster queries on blog + approval status
commentSchema.index({ blog: 1, isApproved: 1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
