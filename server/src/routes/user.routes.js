//server/src/routes/user.routes.js
const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, authorize("ADMIN", "BGD"), userCtrl.getAllUsers);
router.post("/", authenticate, authorize("ADMIN"), userCtrl.createUser);
router.put("/:id", authenticate, authorize("ADMIN"), userCtrl.updateUser);
router.delete("/:id", authenticate, authorize("ADMIN"), userCtrl.deleteUser);

module.exports = router;
