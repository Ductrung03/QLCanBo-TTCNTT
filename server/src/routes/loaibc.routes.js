//server/src/routes/loaibc.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/loaibc.controller");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, ctrl.getAllLoaiBC);

module.exports = router;
