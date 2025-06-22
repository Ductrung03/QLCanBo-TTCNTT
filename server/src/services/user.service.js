const { User, Role, Role_User } = require("../models/init");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  const users = await User.findAll({
    include: {
      model: Role,
      attributes: ["roleId", "roleName"],
      through: { attributes: ["isActive"] },
    },
  });

  return users.map((u) => ({
    UserId: u.UserId,
    UserName: u.UserName,
    Email: u.Email,
    RoleId: u.Roles[0]?.roleId,
    RoleName: u.Roles[0]?.roleName,
  }));
};

const createUser = async ({ UserName, Email, PassWord, RoleId }) => {
  const hash = bcrypt.hashSync(PassWord, 8);
  const newUser = await User.create({ UserName, Email, PassWord: hash });

  await Role_User.create({
    UserId: newUser.UserId,
    roleId: RoleId,
    isActive: true,
  });

  return { message: "Tạo mới thành công" };
};

const updateUser = async (id, { UserName, Email, RoleId }) => {
  await User.update({ UserName, Email }, { where: { UserId: id } });

  await Role_User.destroy({ where: { UserId: id } });
  await Role_User.create({ UserId: id, roleId: RoleId, isActive: true });

  return { message: "Cập nhật thành công" };
};

const deleteUser = async (id) => {
  await Role_User.destroy({ where: { UserId: id } });
  await User.destroy({ where: { UserId: id } });

  return { message: "Xóa thành công" };
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
