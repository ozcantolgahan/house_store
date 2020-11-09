"use strict";

var Category = require("../models/category");

var Product = require("../models/product");

var User = require("../models/user");

var bcrypt = require('bcrypt');

var _require = require("@hapi/joi"),
    func = _require.func;

var saltRounds = 10;
var basket = [];

module.exports.getHomepage = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    Product.getAllProducts().then(function (products) {
      Product.getLastProducts().then(function (lastProducts) {
        res.render("index", {
          user: req.user,
          basket: basket,
          title: "House Store | Home",
          categories: categories,
          products: products,
          lastProducts: lastProducts
        });
      });
    });
  });
};

module.exports.getAllProducts = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    Category.getCategoryId(req.params.categoryName).then(function (category) {
      Product.getAllProductsById(category._id.toString()).then(function (products) {
        Product.getLastProducts().then(function (lastProducts) {
          console.log(products);
          res.render("all-products", {
            user: req.user,
            basket: basket,
            title: req.params.categoryName,
            products: products,
            categories: categories,
            lastProducts: lastProducts
          });
        });
      });
    });
  });
};

module.exports.getServicePage = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    res.render("services", {
      user: req.user,
      basket: basket,
      title: "Services",
      categories: categories
    });
  });
};

module.exports.getContactPage = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    res.render("contact", {
      user: req.user,
      basket: basket,
      title: "Contact",
      categories: categories
    });
  });
};

module.exports.getProductDetail = function (req, res) {
  var product = JSON.parse(req.query.product);
  var newProduct = new Product();
  newProduct._id = product._id;
  newProduct.name = product.name;
  newProduct.description = product.description;
  newProduct.price = product.price;
  newProduct.imageUrl1 = product.imageUrl1;
  newProduct.imageUrl2 = product.imageUrl2;
  newProduct.discountPrice = product.discountPrice;
  newProduct.discount = product.discount;
  newProduct.categoryId = product.categoryId;
  Category.getAllCategories().then(function (categories) {
    res.render("product-detail", {
      user: req.user,
      basket: basket,
      title: newProduct.name,
      categories: categories,
      product: newProduct
    });
  });
};

module.exports.getSearchedProducts = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    Product.getSearchedProducts(req.query.searchProduct).then(function (products) {
      Product.getLastProducts().then(function (lastProducts) {
        res.render("all-products", {
          user: req.user,
          basket: basket,
          title: req.query.searchProduct,
          products: products,
          categories: categories,
          lastProducts: lastProducts
        });
      });
    });
  });
};

module.exports.addToBasket = function (req, res) {
  var product = JSON.parse(req.body.product);
  basket.push(product);
  res.redirect("/");
};

module.exports.removeFromBasket = function (req, res) {
  var productCame = JSON.parse(req.query.product);
  var index = basket.findIndex(function (product) {
    return product.name === productCame.name;
  });
  basket.splice(index, 1);
  res.redirect("/");
};

module.exports.getLoginPage = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    res.render("account", {
      user: req.user,
      err: req.query.valid,
      basket: basket,
      title: req.params.way,
      categories: categories,
      isRegister: req.params.way == "login" ? false : true
    });
  });
};

module.exports.saveUser = function (req, res) {
  delete req.query.valid;
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.address = req.body.address;
  user.joiValidation().then(function () {
    bcrypt.hash(user.password, saltRounds).then(function (hash) {
      console.log(hash);
      user.password = hash;
      user.controlUsersEmail().then(function (result) {
        if (result[0]) {
          res.redirect("/account/register?valid=" + "Bu email zaten kayıtlı");
        } else {
          user.saveUser().then(function (user) {
            res.redirect("/account/login?valid=" + "Kayıt başarılı");
          });
        }
      });
    });
  })["catch"](function (err) {
    var errString = err.details[0].message;
    res.redirect("/account/register?valid=" + errString);
  });
};

module.exports.userLogin = function (req, res) {
  var email = req.query.email;
  var password = req.query.password;
  User.loginUser(email).then(function (user) {
    bcrypt.compare(password, user[0].password).then(function (result) {
      if (result) {
        req.session.user = user;
        return req.session.save(function () {
          res.redirect("/");
        });
      } else {
        res.redirect("/account/login?valid=" + "Hatalı şifre");
      }
    });
  })["catch"](function (err) {
    res.redirect("/account/login?valid=" + "Kayıtlı hesap yok");
  });
};

module.exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};

module.exports.getOrderPage = function (req, res) {
  Category.getAllCategories().then(function (categories) {
    Product.getLastProducts().then(function (lastProducts) {
      res.render("order-page", {
        user: req.user,
        basket: basket,
        title: "Orders",
        categories: categories,
        lastProducts: lastProducts
      });
    });
  });
};