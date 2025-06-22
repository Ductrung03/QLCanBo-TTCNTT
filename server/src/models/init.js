//server/src/models/init.js
const User = require("./User");
const Role = require("./Role");
const Role_User = require("./RoleUser");
const BangCap = require("./BangCap");
const CanBo = require("./CanBo");
const Loai_BC = require("./Loai_BC");
const DonVi = require("./DonVi");
const QuaTrinhCongTac = require("./QuaTrinhCongTac");
const LichSuThayDoi_BC = require("./LichSuThayDoi_BC");

// User-Role
User.belongsToMany(Role, { through: Role_User, foreignKey: "UserId" });
Role.belongsToMany(User, { through: Role_User, foreignKey: "roleId" });
// CanBo - DonVi
CanBo.belongsTo(DonVi, { foreignKey: "MaDV" });
DonVi.hasMany(CanBo, { foreignKey: "MaDV" });

// CanBo - QuaTrinhCongTac
CanBo.hasMany(QuaTrinhCongTac, { foreignKey: "MaCB" });
QuaTrinhCongTac.belongsTo(CanBo, { foreignKey: "MaCB" });

// BangCap - CanBo (người sở hữu)
BangCap.belongsTo(CanBo, { foreignKey: "MaGV", as: "NguoiSoHuu" });

// BangCap - Loai_BC
BangCap.belongsTo(Loai_BC, { foreignKey: "MaLBC" });

// BangCap - LichSuThayDoi_BC
BangCap.hasMany(LichSuThayDoi_BC, { foreignKey: "MaBC" });
LichSuThayDoi_BC.belongsTo(BangCap, { foreignKey: "MaBC" });

module.exports = {
  User,
  Role,
  Role_User,
  BangCap,
  CanBo,
  DonVi,
  Loai_BC,
  QuaTrinhCongTac,
  LichSuThayDoi_BC,
};
