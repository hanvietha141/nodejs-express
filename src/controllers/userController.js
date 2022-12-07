import db from "../models/index";
import UserService from "../services/USerService";

const handleLogin = async (req, res) => {
  const userData = await UserService.handleUserLogin({
    email: req.body.email,
    password: req.body.password,
  });
  if (!userData.errorCode) {
    return res.status(200).json(userData);
  }
  return res.status(200).json({
    errorCode: userData.errorCode,
    message: userData.message,
  });
};
module.exports = {
  handleLogin: handleLogin,
};
