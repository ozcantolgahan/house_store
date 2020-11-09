"use strict";

var express = require("express");

var app = express();

var shopRoute = require("./route/shop");

var mongodb = require("./utility/database");

var bodyParser = require("body-parser");

var accountRoute = require("./route/account");

var cookieParser = require('cookie-parser');

var session = require('express-session');

var _require = require("@hapi/joi"),
    func = _require.func;

var MongoDBStore = require('connect-mongodb-session')(session);

var User = require("./models/user");

mongodb.connectServer();
app.use(express["static"]("public"));
app.use(cookieParser());
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/was_store',
  collection: 'mySessions'
});
app.use(session({
  secret: 'deneme secret',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 3600000
  }
}));
app.use(function (req, res, next) {
  if (!req.session.user) {
    next();
  } else {
    User.loginUser(req.session.user[0].email).then(function (user) {
      req.user = user;
      next();
    });
  }
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.listen(3000);
app.set("view engine", "pug");
app.use(accountRoute);
app.use(shopRoute);