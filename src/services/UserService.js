import db from "../models/index";
import bcrypt from "bcryptjs";

const checkUserEmail = async (email, password) => {
  const user = await db.User.findOne({
    where: {email: email},
    raw: true
  });
  if (user) {
    const check = await bcrypt.compareSync(password, user.password);
    if (check) {
      delete user['password']
      return user;
    }
    return false;
  }
  return false;
};

const handleUserLogin = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = await checkUserEmail(data.email, data.password);
      if (userData) {
        resolve(userData);
      } else {
        resolve({
          errorCode: 1,
          message: "email or password is incorrect",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
