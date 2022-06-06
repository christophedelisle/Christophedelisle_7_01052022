const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// Routes

router.get("/:id", auth, userCtrl.getOneUser);

module.exports = router;
