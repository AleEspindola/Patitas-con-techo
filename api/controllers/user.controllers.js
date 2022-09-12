const UserServices = require("../services/user.services");

class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserServices.createUser(req.body);
      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
