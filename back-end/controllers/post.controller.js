const Post = require("../models/post.model");
const sql = require("../models/db");


// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Post
    const post = new Post({
      userId: req.body.userId,
      title : req.body.title,
      content : req.body.content,
      publicationDate : req.body.publicationDate,
      author : req.body.author
    });
  
    // Save Post in the database
    Post.create(post, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Post."
        });
      else res.status(201).send(data);
    });
  };

// Retrieve all Post from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      else res.send(data);
    });
  };

// Retrieve all Posts from a User.
exports.findAllByUserId = (req, res) => {
  Post.getAllByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    else res.send(data);
  });
};

// Find a single Post with a postId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
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

/*
// Update a Post identified by the postId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Post.updateById(
      req.params.postId,
      new Post(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Post with id ${req.params.postId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Post with id " + req.params.postId
            });
          }
        } else res.send(data);
      }
    );
  };
*/

// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
  sql.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.body.postId}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};

// Delete a Post with the specified postId in the request
exports.deletePost = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          //console.log(req.params.postId);
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Post with id " + req.params.postId
          });
        }
      } else {
        console.log(req.params.postId);
        res.status(200).send({ message: `Post was deleted successfully!` });
      }
    });
  };