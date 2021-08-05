const express = require('express');
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const commentCtrl = require("../controllers/comment.controller")
//const auth = require('../middleware/auth');



// ------------- Posts -----------------------
// Create a new Post
router.post("/", postCtrl.create);

// Retrieve all Posts
router.get("/", postCtrl.findAll);

// Retrieve all Posts with userId
router.get("/user/:userId", postCtrl.findAllByUserId);

// Retrieve a single Post with postId
router.get("/:postId", postCtrl.findOne);

// Update a Post with postId
router.put("/:postId", postCtrl.update);

// Delete a Post with postId
router.delete("/:postId", postCtrl.deletePost);

// ----------------- Comments -----------------
// Create a new Comment
router.post("/:postId/comment", commentCtrl.create);

// Retrieve all Comments for a post
router.get("/:postId/comments", commentCtrl.findAllComments);

// Delete a Comment with CommentId
router.delete("/:postId/:commentId", commentCtrl.delete);





module.exports = router;
