//server/src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const bangcapRoutes = require("./routes/bangcap.routes");
const canboRoutes = require("./routes/canbo.routes");
const loaibcRoutes = require("./routes/loaibc.routes");
const bangluongRoutes = require("./routes/bangluong.routes");

// Import models để sử dụng
const { User, Role, Role_User } = require("./models/init");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/bangcap", bangcapRoutes);
app.use("/api/canbo", canboRoutes);
app.use("/api/loaibc", loaibcRoutes);
app.use("/api/bangluong", bangluongRoutes);
// Function tự động tạo admin account
const initAdminUser = async () => {
  try {
    console.log("🔧 Kiểm tra và tạo tài khoản admin...");
    
    // 1. Tạo role ADMIN nếu chưa có
    let adminRole = await Role.findOne({ where: { roleName: "ADMIN" } });
    if (!adminRole) {
      adminRole = await Role.create({ roleName: "ADMIN" });
      console.log("✅ Đã tạo role ADMIN");
    }

    // 2. Kiểm tra user admin đã tồn tại chưa
    let adminUser = await User.findOne({ where: { UserName: "admin" } });
    
    if (!adminUser) {
      // 3. Tạo user admin
      const hashedPassword = bcrypt.hashSync("Admin@123", 8);
      adminUser = await User.create({
        UserName: "admin",
        Email: "admin@system.com",
        PassWord: hashedPassword,
      });

      // 4. Gán role ADMIN cho user admin
      await Role_User.create({
        UserId: adminUser.UserId,
        roleId: adminRole.roleId,
        isActive: true,
      });

      console.log("✅ Đã tạo tài khoản admin thành công!");
      console.log("👤 Username: Admin");
      console.log("🔑 Password: Admin@123");
    } else {
      console.log("ℹ️  Tài khoản admin đã tồn tại");
    }

    // 5. Tạo thêm các role cơ bản khác nếu chưa có
    const basicRoles = ["GiangVien", "PhongDaoTao", "BGD"];
    for (const roleName of basicRoles) {
      const existingRole = await Role.findOne({ where: { roleName } });
      if (!existingRole) {
        await Role.create({ roleName });
        console.log(`✅ Đã tạo role ${roleName}`);
      }
    }

  } catch (error) {
    console.error("❌ Lỗi khi tạo tài khoản admin:", error);
  }
};

// Sync database và khởi động server
sequelize.sync().then(async () => {
  // Tự động tạo admin sau khi sync DB
  await initAdminUser();
  
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
    console.log("📋 Tài khoản admin mặc định:");
    console.log("   👤 Username: Admin");
    console.log("   🔑 Password: Admin@123");
  });
});