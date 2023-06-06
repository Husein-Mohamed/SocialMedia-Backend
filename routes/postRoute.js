const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  deleteAllPosts,
  getUserPosts,
  deleteUserPosts,
} = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../utils/VerifyToken");

router.post("/", verifyToken, createPost);
router.get("/", verifyToken, getUserPosts);
router.get("/admin", getAllPosts);
router.get("/:id", getPostById);
router.patch("/:id", verifyToken, updatePostById);
router.delete("/:id", verifyToken, deletePostById);
router.delete("/", verifyToken, deleteUserPosts);
router.delete("/admin", deleteUserPosts);

module.exports = router;
