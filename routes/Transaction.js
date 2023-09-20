const express = require("express");
const routes = express();
const TransactionController = require("../controller/TransactionController");
const { isAuthenticated, isAdmin, isUser, isSpecificUser} = require("../middleware/auth");
// const { userValidator } = require("../middleware/validation");

routes.get("/all", isAuthenticated, isAdmin, TransactionController.getAll);
routes.get("/usertransaction", isAuthenticated, isUser, isSpecificUser, TransactionController.getByuserId);
routes.post("/checkout", isAuthenticated, isUser, isSpecificUser, TransactionController.checkOut);

module.exports = routes;