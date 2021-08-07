const User = require("../models/user.model");
const db = require("../models/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
exports.signUp = (req, res, next) => {
  //verify if email exists
  db.query(`SELECT * FROM users WHERE email= ?`,
  req.body.email, (err, results, rows) => {
      //Si email deja utilisé
      if (results.length > 0) {
          res.status(401).json({
              message: 'Email déjà utilisé.'
          });
      } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash
          });
          User.create(user, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(400).json("erreur");
            } else {
              db.query(`SELECT * FROM users WHERE email=?`,
              req.body.email, (err, results, rows) => {
                  return res.status(201).json({
                    message: 'Votre compte a bien été crée !',
                    userId: results[0].id,
                    firstName : results[0].firstName,
                    lastName : results[0].lastName,
                    admin: results[0].admin,
                    token: jwt.sign(
                        { userId: results[0].id},
                        'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V',
                        { expiresIn: '24h'}
                    )
                  })
              })
            }
          }) 
        })
      }
  })
}

exports.login = (req, res, next) => {
  //verify if email exists
  db.query(`SELECT * FROM users WHERE email= ?`,
  req.body.email, (err, results, rows) => {
      //Si utilisateur trouvé : 
      if (results.length > 0) {
        console.log(results[0]);
          //Verification du MDP
        bcrypt.compare(req.body.password, results[0].password)
        .then(valid => {
          if (!valid) { // if PW doesn't match with the email adress return an error
            return res.status(401).json({ error: "Mot de passe incorrect !"});
          } else {
            res.status(200).json({
              userId: results[0].id,
              firstName : results[0].firstName,
              lastName : results[0].lastName,
              admin: results[0].admin,
              token: jwt.sign(
                  { userId: results[0].id},
                  'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V',
                  { expiresIn: '24h'}
              )
            })
          };
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error })
        });
    } else {
      res.status(404).json({
        message: 'Utilisateur inconnu.'
      });
    }
  })

};

// Retrieve all users from the database.
exports.findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          console.log(req.params.userId);
          res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };



