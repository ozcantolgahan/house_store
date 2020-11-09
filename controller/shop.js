const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { func } = require("@hapi/joi");
const saltRounds = 10;
var basket=[];
module.exports.getHomepage=function(req,res){
Category.getAllCategories().then((categories)=>{
    Product.getAllProducts().then((products)=>{
        Product.getLastProducts().then((lastProducts)=>{
            res.render("index",{user:req.user,basket:basket,title:"House Store | Home",categories:categories,products:products,lastProducts:lastProducts});
        });
        
    });
    
});
};

module.exports.getAllProducts=function(req,res){
   Category.getAllCategories().then((categories)=>{
    Category.getCategoryId(req.params.categoryName).then((category)=>{
        Product.getAllProductsById(category._id.toString()).then((products)=>{
            Product.getLastProducts().then((lastProducts)=>{
                console.log(products);
                res.render("all-products",{user:req.user,basket:basket,title:req.params.categoryName,products:products,categories:categories,lastProducts:lastProducts});
            });
           
        })
    });
   });
    
};
module.exports.getServicePage=function(req,res){
    Category.getAllCategories().then((categories)=>{
                res.render("services",{user:req.user,basket:basket,title:"Services",categories:categories});
       });
};
module.exports.getContactPage=function(req,res){
    Category.getAllCategories().then((categories)=>{
                res.render("contact",{user:req.user,basket:basket,title:"Contact",categories:categories});
       });
};
module.exports.getProductDetail=function(req,res){
    let product=JSON.parse(req.query.product);
    var newProduct=new Product();
    newProduct._id=product._id;
    newProduct.name=product.name;
    newProduct.description=product.description;
    newProduct.price=product.price;
    newProduct.imageUrl1=product.imageUrl1;
    newProduct.imageUrl2=product.imageUrl2;
    newProduct.discountPrice=product.discountPrice;
    newProduct.discount=product.discount;
    newProduct.categoryId=product.categoryId;
    Category.getAllCategories().then((categories)=>{
        res.render("product-detail",{user:req.user,basket:basket,title:newProduct.name,categories:categories,product:newProduct});
    });
    
};
module.exports.getSearchedProducts=function(req,res){
   Category.getAllCategories().then((categories)=>{

            Product.getSearchedProducts(req.query.searchProduct).then((products)=>{
                Product.getLastProducts().then((lastProducts)=>{
                    res.render("all-products",{user:req.user,basket:basket,title:req.query.searchProduct,products:products,categories:categories,lastProducts:lastProducts});
                });
               
            })

       });   
};

module.exports.addToBasket=(req,res)=>{
    let product=JSON.parse(req.body.product);
    basket.push(product);
    res.redirect("/");
};
module.exports.removeFromBasket=(req,res)=>{
    let productCame=JSON.parse(req.query.product);
    let index= basket.findIndex((product)=>product.name===productCame.name);
    basket.splice(index,1);
    res.redirect("/");
};
module.exports.getLoginPage=(req,res)=>{
    Category.getAllCategories().then((categories)=>{
    
   res.render("account",{ user:req.user,err:req.query.valid,basket:basket,title:req.params.way,categories:categories,isRegister:req.params.way=="login"?false:true});
   });   
};
module.exports.saveUser= (req,res)=>{
    delete req.query.valid;
    let user=new User();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.address=req.body.address;
    user.joiValidation().then(()=>{ 
        bcrypt.hash(user.password, saltRounds).then((hash)=>{
            console.log(hash);
            user.password=hash;
            user.controlUsersEmail().then((result)=>{
                if(result[0]){
                 res.redirect("/account/register?valid="+"Bu email zaten kayıtlı");
                }else{
                 user.saveUser().then((user)=>{
                     res.redirect("/account/login?valid="+"Kayıt başarılı");});
                }
             });
        });
    }).catch((err)=>{
        let errString=err.details[0].message;
        res.redirect("/account/register?valid="+errString);
    });
}
module.exports.userLogin=(req,res)=>{
    
    const email=req.query.email;
    const password=req.query.password;
    User.loginUser(email).then((user)=>{
        bcrypt.compare(password, user[0].password).then((result)=>{
            if(result){
                req.session.user=user;
                return req.session.save(function(){
                    res.redirect("/");
                });
               
            }else{
                res.redirect("/account/login?valid="+"Hatalı şifre");
            }
        });
        
    }).catch((err)=>{
        res.redirect("/account/login?valid="+"Kayıtlı hesap yok");
    });
   
};
module.exports.logout=(req,res)=>{
req.session.destroy(function (err) {
    res.redirect("/");
});
};
module.exports.getOrderPage=(req,res)=>{
    Category.getAllCategories().then((categories)=>{
            Product.getLastProducts().then((lastProducts)=>{
                res.render("order-page",{user:req.user,basket:basket,title:"Orders",categories:categories,lastProducts:lastProducts});
            });
   }); 
};