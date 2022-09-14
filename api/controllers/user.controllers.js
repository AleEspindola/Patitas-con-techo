const UserService = require("../services/user.services");
const { validateToken, generateToken } = require("../config/tokens");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

class UserController {
  static async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      if (user) {
        const token = generateToken({
          _id: user._id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
        });
        const payload = validateToken(token);
        req.user = payload;
        res.cookie("token", token, { maxAge: 9000000 });
        res.status(201).send(user);
      } else res.sendStatus(400);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logIn(req, res) {
    try {
      const user = await UserService.find(req);
      if (!user) return res.sendStatus(401);
      const passwordHashed = bcrypt.hashSync(req.body.password, user.salt);
      if (passwordHashed === user.password) {
        const token = generateToken({
          _id: user._id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
        });
        const payload = validateToken(token);
        req.user = payload;
        res.cookie("token", token);
        res.status(201).send(req.user);
      } else return res.sendStatus(401);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logOut(req, res) {
    try {
      console.log(req.cookies.token);
      res.clearCookie("token");
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
    }
    document.cookie = "token= ";
  }

  static async deleteUser(req, res) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      return res.status(204).send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(404).send("Usuario no encontrado");
      return res.status(200).send(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async userUpdate(req, res) {
    try {
      const user = await UserService.userUpdate(req.body, req.params.id)
      return res.status(204).send(user)
  } catch (error) {
      console.log(error)
  }
}

  static async getFavorites(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      return user
        ? res.send(user.favorites)
        : res.status(404).send("User not found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async addFavorite(req, res) {
    try {
      const user = await UserService.addFavorite(req.params.id, req.body);
      return user
        ? res.send(user)
        : res.status(404).send("User not found/favorite already added");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async removeFavorite(req, res) {
    try {
      const user = await UserService.removeFavorite(
        req.params.id,
        req.body._id
      );
      return user
        ? res.send(user)
        : res.status(404).send("User not found/favorite already removed");
    } catch (error) {
      console.log(error.message);
    }
  }

}
module.exports = UserController;
