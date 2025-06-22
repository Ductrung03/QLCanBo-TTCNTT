const router = require("express").Router();
const ctrl = require("../controllers/bangluong.controller");
const { authenticate, authorize } = require("../middlewares/auth");

router.get("/", authenticate, ctrl.getAll);
router.post("/", authenticate, authorize("ADMIN", "PhongTaiChinh"), ctrl.create);
router.put("/:id", authenticate, authorize("ADMIN", "PhongTaiChinh"), ctrl.update);
router.delete("/:id", authenticate, authorize("ADMIN"), ctrl.remove);
router.get("/view/:id", authenticate, ctrl.getById);
router.post("/tinh-luong", authenticate, authorize("ADMIN", "PhongTaiChinh"), ctrl.tinhLuong);
router.put("/:id/approve", authenticate, authorize("ADMIN"), ctrl.approve);
router.put("/:id/reject", authenticate, authorize("ADMIN"), ctrl.reject);

module.exports = router;