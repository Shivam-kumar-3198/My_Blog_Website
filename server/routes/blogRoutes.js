// server/routes/blogRoutes.js
import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

/**
 * TEMP TEST ROUTE
 * Use this to verify the router is mounted and reachable:
 *  curl http://localhost:3000/api/blog/test-route
 *
 * Remove this route after debugging.
 */
blogRouter.get("/test-route", (req, res) => {
  res.json({ ok: true, route: "/api/blog/test-route" });
});

// ---------------- AI Routes ----------------
// Primary protected AI endpoint
// Keep `auth` in place for production. To debug auth, temporarily remove the `auth` middleware.
blogRouter.post("/generate", auth, generateContent);

// Alias: same handler, different path (so frontend can call either /generate or /ai/generate)
blogRouter.post("/ai/generate", auth, generateContent);

// ---------------- Public Blog Routes ----------------
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);

// ---------------- Public Comment Routes ----------------
blogRouter.post("/:blogId/comments", addComment);
blogRouter.get("/:blogId/comments", getBlogComments);

// ---------------- Protected (Admin) Routes ----------------
blogRouter.post("/add", auth, upload.single("image"), addBlog);
blogRouter.delete("/:blogId", auth, deleteBlogById);
blogRouter.patch("/:blogId/toggle-publish", auth, togglePublish);

export default blogRouter;
