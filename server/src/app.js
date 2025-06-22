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

sequelize.sync().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
