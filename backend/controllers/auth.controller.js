const bcrypt = require("bcrypt");
const dbc = require("../config/db");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // hash password

  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      const user = {
        user_email: req.body.email,
        user_password: hash,
        user_firstname: req.body.firstname,
        user_lastname: req.body.lastname,
      };

      // SQL injection attack protection with SET "?"
      const sql = "INSERT INTO users2 SET ?";
      const db = dbc.getDB();

      db.query(sql, user, (err, result) => {
        if (!result) {
          //  "unique" email configured in bdd
          res.status(200).json({ message: "Email déjà existant !" });
        } else {
          res.status(201).json({ message: "Utilisateur créé !" });
        }
      });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.login = (req, res) => {
  const email = req.body.email;
  const user = {
    password: req.body.password,
  };

  const sql = "SELECT * FROM users2 WHERE user_email=?";
  const db = dbc.getDB();

  db.query(sql, email, (err, result) => {
    if (result == 0) {
      return res
        .status(200)
        .json({ message: "Mot de passe / email incorrect" });
    } else
      bcrypt.compare(user.password, result[0].user_password).then((valid) => {
        if (!valid) {
          return res
            .status(200)
            .json({ message: "Mot de passe / email incorrect" });
        } else {
          // remove password from response
          delete result[0].user_password;

          const token = jwt.sign(
            // userId "hashed", in token
            { userId: result[0].user_id },
            process.env.JWT_KEY_TOKEN,
            {
              expiresIn: "24h",
            }
          );
          //res.cookie("jwt", token, { httpOnly: true });
          res.status(201).json({
            user: result[0],
            token: token,
          });
        }
        if (err) {
          return res.status(404).json({ err });
        }
      });
  });
};

exports.logout = (req, res) => {
  // res.clearCookie("jwt");
  res.status(200).json("Deconnecté !");
};
