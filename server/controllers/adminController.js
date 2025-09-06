import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

// ---------------------- Admin Login ----------------------
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate credentials from .env
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------------- Get All Blogs (Admin) ----------------------
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------------- Get All Comments (Admin) ----------------------
export const getAllcomments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------------- Dashboard Stats ----------------------
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------------- Delete Comment ----------------------
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------------- Approve Comment ----------------------
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!updatedComment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment approved successfully", updatedComment });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
