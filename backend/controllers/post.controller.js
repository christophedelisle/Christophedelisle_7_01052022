const dbc = require("../config/db");
const db = dbc.getDB();

exports.createPost = (req, res) => {
  let { body, file } = req;
  if (!file)
    body = {
      ...body,
    };

  const sql = "INSERT INTO posts SET ?";
  db.query(sql, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};
