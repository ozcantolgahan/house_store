const express=require("express");
const route=express.Router();
const shopController=require("../controller/shop");

route.get("/categories/:categoryName",shopController.getAllProducts);

route.get("/services",shopController.getServicePage);
route.get("/contact",shopController.getContactPage);
route.get("/product/:name",shopController.getProductDetail);
route.get("/search",shopController.getSearchedProducts);
route.post("/addToBasket",shopController.addToBasket);
route.get("/removeFromBasket",shopController.removeFromBasket);
route.get("/",shopController.getHomepage);

module.exports=route;