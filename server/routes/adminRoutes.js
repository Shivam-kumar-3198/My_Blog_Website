import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllcomments,
  getDashboard,
} from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// ------------------ Auth ------------------
adminRouter.post("/login", adminLogin);

// ------------------ Comments ------------------
adminRouter.get("/comments", auth, getAllcomments);
adminRouter.delete("/comments/:id", auth, deleteCommentById); // ✅ RESTful delete
adminRouter.patch("/comments/:id/approve", auth, approveCommentById); // ✅ RESTful approve

// ------------------ Blogs ------------------
adminRouter.get("/blogs", auth, getAllBlogsAdmin);

// ------------------ Dashboard ------------------
adminRouter.get("/dashboard", auth, getDashboard); // ✅ fixed typo

export default adminRouter;
