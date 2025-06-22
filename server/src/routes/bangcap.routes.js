//server/src/routes/bangcap.routes.js
const router = require("express").Router();
const ctrl = require("../controllers/bangcap.controller");
const { authenticate, authorize } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", authenticate, authorize("ADMIN", "GiangVien"), ctrl.getAll);
router.post(
  "/",
  authenticate,
  upload.single("FileScan"),
  authorize("ADMIN"),
  ctrl.create
);
router.put(
  "/:id",
  authenticate,
  upload.single("FileScan"),
  authorize("ADMIN"),
  ctrl.update
);
router.delete("/:id", authenticate, authorize("ADMIN"), ctrl.remove);
router.get("/lichsu/:id", authenticate, authorize("ADMIN"), ctrl.getHistory);
router.get("/view/:id", authenticate, authorize("ADMIN"), ctrl.getById);

module.exports = router;
