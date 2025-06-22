//
const router = require("express").Router();
const { Role } = require("../models/init");

router.get("/", async (req, res) => {
  const roles = await Role.findAll();
  res.json(roles);
});

module.exports = router;
