//server/src/routes/canbo.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/canbo.controller");
const { authenticate } = require("../middlewares/auth");

router.get("/", authenticate, ctrl.getAllCanBo);
router.get("/donvi", authenticate, ctrl.getAllDonVi);
module.exports = router;
