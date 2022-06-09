const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Roads

router.post("/", auth, upload.single("post_image"), postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

router.get("/image/:id", auth, postCtrl.getOneImage);

router.patch("/:id/likeUnlike", auth, postCtrl.likeUnlikePost);
router.post("/:id/likes", auth, postCtrl.nbLikes);

module.exports = router;
