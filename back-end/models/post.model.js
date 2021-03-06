const sql = require("./db");

// constructor
const Post = function (post) {
    this.userId = post.userId;
    this.title = post.title;
    this.content = post.content;
    this.publicationDate = post.publicationDate;
    this.author = post.author;
}

//Create Post
Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created post: ", { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    });
  };
  
  //find post with postId
  Post.findById = (postId, result) => {
    sql.query("SELECT * FROM posts WHERE id = ?", postId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found post: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  //Get all Posts
  Post.getAll = result => {
    sql.query("SELECT * FROM posts ORDER BY posts.id DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("posts: ", res);
      result(null, res);
    });
  };
  
  //Get all Posts from a Userid
  Post.getAllByUserId = (userId, result) => {
    sql.query(`SELECT * FROM posts WHERE userId = ? ORDER BY posts.id DESC`, userId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("posts: ", res);
      result(null, res);
    });
  };


  //Delete post with id
  Post.remove = (postId, result) => {
    sql.query(`DELETE FROM posts
    WHERE posts.id = ?;`, postId, (err, res) => {
      if (err) {
        console.log(postId);
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("deleted post with id: ", postId);
      result(null, res);
    });
  };
  
  
  module.exports = Post;