// server/controllers/blogController.js
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";
import generateBlogContent from "../configs/gemini.js";

/**
 * Helper to respond with a standardized error structure
 */
const aiErrorResponse = (res, code, message) => {
  // map to sensible HTTP status codes for client
  const statusMap = {
    API_KEY_INVALID: 502, // bad gateway / upstream service error
    API_FORBIDDEN: 403,
    QUOTA_EXCEEDED: 429,
    NO_TEXT: 502,
    GENERIC_API_ERROR: 502,
  };
  const status = statusMap[code] || 500;
  return res.status(status).json({ success: false, message });
};

// ---------------------- Add Blog ----------------------
export const addBlog = async (req, res) => {
  try {
    let blogData = req.body.blog;

    if (typeof blogData === "string") {
      blogData = JSON.parse(blogData);
    }

    const { title, subTitle, description, category, isPublished } = blogData;
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const response = await imagekit.upload({
      file: imageFile.buffer,
      fileName: imageFile.originalname,
      folder: "blogs",
    });

    const optimizedImageUrl = imagekit.url({
      src: response.url,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
        { height: "auto" },
      ],
    });

    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished,
      author: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Get All Blogs (Published only) ----------------------
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Get Blog by ID ----------------------
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Delete Blog by ID (with comments cleanup) ----------------------
export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await Comment.deleteMany({ blog: blogId });

    res.status(200).json({
      success: true,
      message: "Blog and its comments deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Toggle Publish Status ----------------------
export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog is now ${blog.isPublished ? "Published" : "Unpublished"}`,
      blog,
    });
  } catch (error) {
    console.error("Error toggling publish status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Add Comment (pending approval) ----------------------
export const addComment = async (req, res) => {
  try {
    const { name, content } = req.body;
    const { blogId } = req.params;

    if (!name || !content) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const comment = await Comment.create({
      blog: blogId,
      name,
      content,
      isApproved: false,
    });

    res.status(201).json({
      success: true,
      message: "Comment submitted for review",
      comment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Get Blog Comments (only approved) ----------------------
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- Generate Content using Gemini ----------------------
export const generateContent = async (req, res) => {
  try {
    const { prompt: rawPrompt, subTitle: rawSubTitle } = req.body;

    const prompt = typeof rawPrompt === "string" ? rawPrompt.trim() : "";
    const subTitle = typeof rawSubTitle === "string" ? rawSubTitle.trim() : "";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt (title) is required",
      });
    }

    // guard: avoid extremely long prompts
    if (prompt.length > 8000) {
      return res.status(400).json({
        success: false,
        message: "Prompt too long (max 8000 characters).",
      });
    }

    const fullPrompt = `${prompt}${subTitle ? " - " + subTitle : ""}.
Generate a comprehensive, professional blog post in clean HTML format
with <h1>, <h2>, <p>, and <ul>/<ol> tags where appropriate. Keep sections concise and add a short conclusion.`;

    // call the Gemini wrapper
    let content;
    try {
      content = await generateBlogContent(fullPrompt);
    } catch (err) {
      // If generateBlogContent throws normalized errors with .code, handle them
      console.error("Gemini wrapper error:", err);
      if (err.code === "API_KEY_INVALID") {
        return aiErrorResponse(
          res,
          "API_KEY_INVALID",
          "AI API key invalid or expired. Please renew the GEMINI_API_KEY."
        );
      }
      if (err.code === "QUOTA_EXCEEDED") {
        return aiErrorResponse(
          res,
          "QUOTA_EXCEEDED",
          "Generative API quota exceeded. Check billing/quotas."
        );
      }
      if (err.code === "API_FORBIDDEN") {
        return aiErrorResponse(
          res,
          "API_FORBIDDEN",
          "AI service forbidden. Please check API permissions."
        );
      }
      if (err.code === "NO_TEXT") {
        return aiErrorResponse(
          res,
          "NO_TEXT",
          "AI returned no content. Try again with a different prompt."
        );
      }

      // fallback generic
      return res.status(502).json({
        success: false,
        message:
          err.message ||
          "Upstream AI service error. Please try again later or check server logs.",
      });
    }

    // sanity-check response
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return res.status(502).json({
        success: false,
        message: "AI returned empty content. Try a different prompt.",
      });
    }

    // optional: limit size returned to avoid huge payloads
    const maxLength = 200000; // ~200KB cap
    const finalContent =
      content.length > maxLength ? content.slice(0, maxLength) : content;

    res.status(200).json({ success: true, content: finalContent });
  } catch (error) {
    console.error("Error generating content (unexpected):", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate content",
    });
  }
};
