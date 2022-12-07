import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {}
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  let a = await CRUDService.createNewUser(req.body);
  return res.send("send");
};

const readCRUD = async (req, res) => {
  const users = await CRUDService.getAllUser();
  return res.status(200).json(users);
};

const editCRUD = async (req, res) => {
  let user = await CRUDService.editUser(req.query.id);
  return res.render("edit-crud.ejs", {
    user: user,
  });
};

const putCRUD = async (req, res) => {
  let data = await CRUDService.updateUserData(req.body);
  res.send('updated')
  // const users = await CRUDService.getAllUser();
  // return res.render("display-crud.ejs", {
  //   users: users,
  // });
};

const deleteCRUD = async (req, res) => {
  console.log(req.query);
  await CRUDService.deleteUser(req.query.id);
  res.send('deleted')
  // const users = await CRUDService.getAllUser();
  // return res.render("display-crud.ejs", {
  //   users: users,
  // });
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  readCRUD: readCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
