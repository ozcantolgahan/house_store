"use strict";

var express = require("express");

var route = express.Router();

var shopController = require("../controller/shop");

var accountMW = require("../middleware/accountmw");

route.get("/account/:way", accountMW.isAuth, shopController.getLoginPage);
route.post("/register", shopController.saveUser);
route.get("/login", shopController.userLogin);
route.get("/logout", shopController.logout);
route.get("/orders", accountMW.isAuthForOrders, shopController.getOrderPage);
module.exports = route;