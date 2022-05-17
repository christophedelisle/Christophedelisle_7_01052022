const bcrypt = require("bcrypt");
const dbc = require("../config/db");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  // hashage du mdp
  //const { user_password: password } = req.body;
  bcrypt
    .hash(req.body.password, 10)

    .then((hash) => {
      const user = {
        user_email: req.body.email,
        user_password: hash,
        user_firstname: req.body.firstname,
        user_lastname: req.body.lastname,
      };
      console.log(user);
      // protection contre les attaques par injection SQL en utilisant le SET "?"
      const sql = "INSERT INTO users SET ?";
      const db = dbc.getDB();
      db.query(sql, user, (err, result) => {
        console.log(result);
        if (!result) {
          // email mysql indexé en tant que "unique" préalablement dans bdd
          res.status(200).json({ message: "Email déjà enregistré" });
        } else {
          res.status(201).json({ message: "Utilisateur créé !" });
        }
        if (err) {
          return res.status(404).json({ err });
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

  const sql =
    "SELECT user_firstname, user_lastname, user_password, user_id, user_email FROM users WHERE user_email=?";
  const db = dbc.getDB();

  db.query(sql, email, (err, result) => {
    console.log(result);

    if (result == 0) {
      return res.status(404).json({ message: "email introuvable" });
    } else
      bcrypt.compare(user.password, result[0].user_password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        } else {
          // suppression du password dans la réponse
          delete result[0].user_password;

          const token = jwt.sign(
            // userId "crypté", dans le token
            { userId: result[0].user_id },
            process.env.JWT_KEY_TOKEN,
            {
              expiresIn: "24h",
            }
          );
          res.cookie("jwt", token, { httpOnly: true });
          res.status(201).json({
            user: result[0],
            token: token /*jwt.sign(
              // userId "crypté", dans le token
              { userId: result[0].user_id },
              `${process.env.JWT_KEY_TOKEN}`,
              {
                expiresIn: "24h",
              }
            ),*/,
          });
        }
        if (err) {
          return res.status(404).json({ err });
        }
      });
  });
};
