"use strict";

module.exports.isAuth = function (req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports.isAuthForOrders = function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/account/login");
  } else {
    next();
  }
};