const { validationResult } = require("express-validator");
const { success, failure } = require("../util/common");
const UserModel = require("../model/User");
const HTTP_STATUS = require("../constants/statusCodes");

class UserController {
  async getAll(req, res) {
    try {
      const users = await UserModel.find({});
      if (users.length > 0) {
        return res
          .status(HTTP_STATUS.OK)
          .send(success("Successfully received all users", { result: users, total: users.length }));
      }
      return res.status(HTTP_STATUS.OK).send(success("No users were found"));
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }

  async getOneById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById({ _id: id });
      if (user) {
        return res.status(HTTP_STATUS.OK).send(success("Successfully received the user", user));
      } else {
        return res.status(HTTP_STATUS.OK).send(failure("Failed to received the user"));
      }
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (deletedUser) {
        return res.status(HTTP_STATUS.OK).send(success("Successfully deleted the user", deletedUser));
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("User not found"));
      }
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }

  async updateById(req, res) {
    try {
      const { id } = req.params;
      const { name, rank, email, status } = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, rank, email, status },
        { new: true } 
      );

      if (updatedUser) {
        return res.status(HTTP_STATUS.OK).send(success("Successfully updated the user", updatedUser));
      } else {
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure("User not found"));
      }
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }

  async deleteAll(req, res) {
    try {
      await UserModel.deleteMany({});
      return res.status(HTTP_STATUS.OK).send(success("Successfully deleted all users"));
    } catch (error) {
      console.log(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(failure("Internal server error"));
    }
  }


}

module.exports = new UserController();
