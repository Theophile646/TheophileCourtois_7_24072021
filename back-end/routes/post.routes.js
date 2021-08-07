const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const commentCtrl = require("../controllers/comment.controller")
const auth = require('../middleware/auth');



// ------------- Posts -----------------------
// Create a new Post
router.post("/", auth, postCtrl.create);

// Retrieve all Posts
router.get("/", auth, postCtrl.findAll);

// Retrieve all Posts with userId
router.get("/user/:userId", auth, postCtrl.findAllByUserId);

// Retrieve a single Post with postId
router.get("/:postId", auth, postCtrl.findOne);

// Update a Post with postId
router.put("/:postId", auth, postCtrl.modifyOnePost);

// Delete a Post with postId
router.delete("/:postId", auth,postCtrl.deletePost);

// ----------------- Comments -----------------
// Create a new Comment
router.post("/:postId/comment", auth, commentCtrl.create);

// Retrieve all Comments for a post
router.get("/:postId/comments", auth, commentCtrl.findAllComments);

// Delete a Comment with CommentId
router.delete("/:postId/comments/:commentId", auth, commentCtrl.delete);

module.exports = router;
