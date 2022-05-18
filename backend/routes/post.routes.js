const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Routes

router.post("/", auth, upload.single("post_image"), postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

router.patch("/:id/likeUnlike", auth, postCtrl.likeUnlikePost);

module.exports = router;
