const dbc = require("../config/db");
const db = dbc.getDB();

exports.getOneUser = (req, res) => {
  //const userId = req.params.id;
  const { id: userId } = req.params;

  const sql = `SELECT * FROM users2 WHERE users.user_id = ${userId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result);
  });
};
