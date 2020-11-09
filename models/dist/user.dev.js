"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mongodb = require("../utility/database");

var Joi = require('@hapi/joi');

module.exports =
/*#__PURE__*/
function () {
  function User(_id, name, email, password, address) {
    _classCallCheck(this, User);

    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
  }

  _createClass(User, [{
    key: "saveUser",
    value: function saveUser() {
      var db = mongodb.getDb();
      return db.collection("users").insertOne({
        name: this.name,
        email: this.email,
        password: this.password,
        address: this.address
      });
    }
  }, {
    key: "joiValidation",
    value: function joiValidation() {
      var schema = Joi.object({
        _id: Joi.string(),
        name: Joi.string().min(3).max(30).trim().required(),
        email: Joi.string().email().required(),
        password: Joi.string().trim().required(),
        address: Joi.string().required()
      });
      return schema.validate(this);
    }
  }, {
    key: "controlUsersEmail",
    value: function controlUsersEmail() {
      var db = mongodb.getDb();
      return db.collection("users").find({
        email: this.email
      }).toArray();
    }
  }], [{
    key: "loginUser",
    value: function loginUser(email) {
      var db = mongodb.getDb();
      return db.collection("users").find({
        email: email
      }).toArray();
    }
  }]);

  return User;
}();