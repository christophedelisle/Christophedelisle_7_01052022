const dbc = require("../config/db");
const db = dbc.getDB();

exports.createPost = (req, res) => {
  let { body, file } = req;
  if (!file)
    body = {
      user_id: req.body.user_id,
      author_firstname: req.body.author_firstname,
      author_lastname: req.body.author_lastname,
      message: req.body.message,
    };

  const sql = "INSERT INTO posts SET ?";
  db.query(sql, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    const post_id = result.insertId;
    if (file) {
      const sql = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
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
  const sql = "SELECT * FROM posts, users WHERE  posts.user_id = users.user_id";
  db.query(sql, (err, result) => {
    result.forEach((result) => {
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
  const sql = `SELECT * FROM posts WHERE posts.id = ${postId};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.deleteOnePost = (req, res) => {
  const { id: post_id } = req.params;
  const sql = `DELETE FROM posts WHERE posts.id = ${post_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.likeUnlikePost = (req, res) => {
  const postId = req.body.postId;
  const userId = req.params.id;
  const sql = `SELECT * FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sql = `INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId})`;
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      const sql = `DELETE FROM likes WHERE likes.user_id = ${userId} AND likes.post_id = ${postId}`;
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
