//server/src/routes/auth.routes.js
const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth");

router.post("/login", authCtrl.login);
router.get("/me", authenticate, authCtrl.getProfile);

module.exports = router;
