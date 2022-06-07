const dbc = require("../config/db");
const db = dbc.getDB();

exports.createPost = (req, res) => {
  let { body, file } = req;
  if (!file) delete req.body.post_image;
  body = {
    user_id: req.body.user_id,
    author_firstname: req.body.author_firstname,
    author_lastname: req.body.author_lastname,
    message: req.body.message,
  };

  const sql = "INSERT INTO posts2 SET ?";
  db.query(sql, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    const post_id = result.insertId;
    if (file) {
      const sql = `INSERT INTO images2 (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      db.query(sql, (err, result) => {
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

exports.getAllPosts = (req, res) => {
  const sql =
    "SELECT * FROM posts2, users2 WHERE  posts2.user_id = users2.user_id";
  db.query(sql, (err, result) => {
    (result || []).forEach((result) => {
      delete result.user_password;
    });

    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOnePost = (req, res) => {
  const { id: postId } = req.params;
  const sql = `SELECT * FROM posts2 WHERE posts2.id = ${postId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneImage = (req, res) => {
  const { id: postId } = req.params;
  const sql = `SELECT * FROM images2 WHERE images2.post_id = ${postId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result[0]) {
      result[0].image_url =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/posts/" +
        result[0].image_url;
    }
    res.status(200).json(result);
  });
};

exports.deleteOnePost = (req, res) => {
  const { id: post_id } = req.params;
  const sqlFindPostId = `SELECT * FROM posts2 WHERE posts2.id = ${post_id};`;
  const sqlFindAdmin = `SELECT * FROM users2 WHERE user_admin = 1`;
  //("SELECT * FROM users WHERE users.user_admin = 1 AND `SELECT * FROM posts WHERE posts.id = ${post_id};`"); /*`SELECT * FROM posts WHERE posts.id = ${post_id};`*/
  //const sqlFind = `SELECT * FROM users JOIN posts ON users.user_id = posts.user_id OR user_admin = 1`;

  db.query(sqlFindPostId, (err, resultPostId) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (resultPostId[0].user_id === req.userId) {
      const sqlDelete = `DELETE FROM posts2 WHERE posts2.id = ${post_id}`;
      db.query(sqlDelete, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else if (resultPostId[0].user_id !== req.userId) {
      return res.status(201).json({
        error: "Unauthorized request!",
      });
    } else {
      db.query(sqlFindAdmin, (err, resultAdmin) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        if (resultAdmin[0].user_id !== req.userId) {
          return res.status(403).json({
            error: "Unauthorized request!",
          });
        } else {
          const sqlDelete = `DELETE FROM posts2 WHERE posts2.id = ${post_id}`;
          db.query(sqlDelete, (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          });
        }
      });
    }
  });
};

exports.likeUnlikePost = (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;

  const sql = `SELECT * FROM likes2 WHERE likes2.user_id = ${userId} AND likes2.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sql = `INSERT INTO likes2 (user_id, post_id) VALUES (${userId}, ${postId})`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      const sql = `DELETE FROM likes2 WHERE likes2.user_id = ${userId} AND likes2.post_id = ${postId}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json(result);
      });
    }
  });
};

exports.nbLikes = (req, res) => {
  const { postId } = req.body;
  const sql = `SELECT COUNT(*) AS total FROM likes2 WHERE likes2.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
