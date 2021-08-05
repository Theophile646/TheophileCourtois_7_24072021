const Comment = require("../models/comment.model");

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Comment
    const comment = new Comment({
        userId: req.body.userId,
        postId: req.body.postId,
        date: req.body.date,
        content: req.body.content,
    });
  
    // Save Comment in the database
    Comment.create(comment, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      else res.status(201).send(data);
    });
  };

// Retrieve all Comment from a post.
exports.findAllComments = (req, res) => {
    Comment.getAllByPostId(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Post with id " + req.params.postId
          });
        }
      } else res.send(data);
    });
  };


// Delete a Comment with the specified CommentId in the request
exports.delete = (req, res) => {
    Comment.remove(req.params.commentId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.commentId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Comment with id " + req.params.commentId
          });
        }
      } else res.send({ message: `Comment was deleted successfully!` });
    });
  };