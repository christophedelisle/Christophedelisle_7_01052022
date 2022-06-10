const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

// Roads

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/desactivateAccount", auth, authCtrl.desactivateAccount);

module.exports = router;
