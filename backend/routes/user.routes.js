const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

// Roads

router.get("/:id", auth, userCtrl.getOneUser);

module.exports = router;
