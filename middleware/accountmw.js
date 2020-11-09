module.exports.isAuth=(req,res,next)=>{
if(!req.session.user){
     next();
}else{
    res.redirect("/");
}

};
module.exports.isAuthForOrders=(req,res,next)=>{
    if(!req.session.user){
        res.redirect("/account/login");
    }else{
        next();
    }
}