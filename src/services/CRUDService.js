import db from "../models/index";
import bcrypt from "bcryptjs";

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender == "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("tao moi user thanh cong");
    } catch (err) {
      reject(err);
    }
  });
};

const editUser = async (id) => {
  const user = await db.User.findOne({ where: { id: id } });
  if (user) {
    return user;
  } else {
    return {};
  }
};

const getAllUser = async () => {
  const users = await db.User.findAll({
    raw: true,
  });
  return users;
};

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync("B4c0//", salt);
      resolve(hashPassword);
    } catch (err) {
      reject(err);
    }
    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync("B4c0//", salt);
  });
};

const updateUserData = async (data) => {
  await db.User.update(
    {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber
    },
    {
      where: {
        id: data.id,
      },
    }
  );
};

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id
    }
  });
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  editUser: editUser,
  updateUserData: updateUserData,
  deleteUser: deleteUser
};
