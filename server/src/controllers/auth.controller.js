//server/src/controllers/auth.controller.js
const { User, Role_User, Role } = require("../models/init");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { UserName: username } });
  if (!user || !bcrypt.compareSync(password, user.PassWord))
    return res.status(401).json({ message: "Sai thông tin đăng nhập" });

  const roles = await user.getRoles();
  const token = jwt.sign(
    { id: user.UserId, username: user.UserName, role: roles[0]?.roleName },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token, role: roles[0]?.roleName });
};
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["UserId", "UserName", "FullName", "UserType"],
    });

    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({
      UserId: user.dataValues.UserId,
      UserName: user.dataValues.UserName,
      FullName: user.dataValues.FullName,
      UserType: user.dataValues.UserType,
    });
  } catch (err) {
    console.error("Lỗi getProfile:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
