const express=require("express");
const app=express();
const shopRoute=require("./route/shop");
const mongodb=require("./utility/database");
const bodyParser=require("body-parser");
const accountRoute=require("./route/account");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { func } = require("@hapi/joi");
var MongoDBStore = require('connect-mongodb-session')(session);
const User = require("./models/user");
mongodb.connectServer();
app.use(express.static("public"));
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
  app.use(function(req,res,next){
      if(!req.session.user){
          next();
      }else{
        User.loginUser(req.session.user[0].email).then((user)=>{
            req.user=user;
            next();
        });
      }
  });
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000);
app.set("view engine","pug");
app.use(accountRoute);
app.use(shopRoute);
