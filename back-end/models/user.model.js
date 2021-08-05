const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.password = user.password;
  this.admin = user.admin;
};


User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};


User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.remove = (userId, result) => {
  sql.query(`DELETE users, posts, comments
  FROM users 
  LEFT JOIN posts ON users.id = posts.userId
  RIGHT JOIN comments ON users.id = comments.userId
  WHERE users.id = ${userId};`, userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("deleted user with id: ", userId);
    result(null, res);
  });
};



module.exports = User;