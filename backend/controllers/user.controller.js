const dbc = require("../config/db");
const db = dbc.getDB();

exports.getOneUser = (req, res) => {
  //const userId = req.params.id;
  const { id: userId } = req.params;

  const sql = `SELECT * FROM users WHERE users.user_id = ${userId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result);
  });
};

exports.updateOneUser = (req, res) => {
  const { user_firstname, user_lastname } = req.body;
  const { id: userId } = req.params;
  const sql = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}" WHERE users.user_id = ${userId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      console.log(result);
      res.status(200).json(result);
    }
  });
};
