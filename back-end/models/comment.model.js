const sql = require("./db");

// constructor
const Comment = function (comment) {
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.date = comment.date;
    this.content = comment.content;
}

Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created comment: ", { id: res.insertId, ...newComment });
      result(null, { id: res.insertId, ...newComment });
    });
  };

  //Get all comment from a post
  Comment.getAllByPostId = (postId, result) => {
    sql.query(`SELECT comments.id AS commentId, users.id AS userId, users.firstName, users.LastName, comments.date, comments.content 
    FROM comments 
    INNER JOIN posts ON posts.id = comments.postId 
    INNER JOIN users on users.id = comments.userId
    WHERE comments.postId = ${postId}
    ORDER BY comments.id DESC;`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("comments: ", res);
      result(null, res);
    });
  };

  Comment.remove = (id, result) => {
    sql.query("DELETE FROM comments WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted post with id: ", id);
      result(null, res);
    });
  };
  
  
  module.exports = Comment;