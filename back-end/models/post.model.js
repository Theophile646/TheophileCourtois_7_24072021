const sql =require("./db");

// constructor
const Post = function (post) {
    this.userId = post.userId;
    this.title = post.title;
    this.content = post.content;
    this.publicationDate = post.publicationDate;
    this.author = post.author;
}

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
  
  Post.findById = (postId, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${postId}`, (err, res) => {
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
  
  Post.getAll = result => {
    sql.query("SELECT * FROM posts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("posts: ", res);
      result(null, res);
    });
  };
  
  //Get all Posts from a User
  Post.getAllByUserId = (userId, result) => {
    sql.query(`SELECT users.firstName, users.lastName, posts.publicationDate, posts.title, posts.content, posts.id FROM posts INNER JOIN users ON users.id = posts.userId
    WHERE users.id = ${userId};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("posts: ", res);
      result(null, res);
    });
  };



  Post.updateById = (id, post, result) => {
    sql.query(
      "UPDATE posts SET email = ?, name = ?, lastName = ? WHERE id = ?",
      [post.title, post.content, post.publicationDate, post.author, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Post with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated post: ", { id: id, ...post });
        result(null, { id: id, ...post });
      }
    );
  };
  
  Post.remove = (postId, result) => {
    sql.query(`DELETE posts, comments
    FROM posts 
    LEFT JOIN comments ON posts.id = comments.postId
    WHERE posts.id = ${postId};`, (err, res) => {
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