const mongodb=require("../utility/database");
module.exports=class Product{
    constructor(_id,name,description,price,imageUrl1,imageUrl2,discountPrice,discount,categoryId) {
        this._id=_id;
        this.name=name;
        this.description=description;
        this.price=price;
        this.imageUrl1=imageUrl1;
        this.imageUrl2=imageUrl2;
        this.discount=discount;
        this.discountPrice=discountPrice;
        this.categoryId=categoryId;
    }
    static getAllProducts(){
        const db=mongodb.getDb();
        return db.collection("products").find().toArray();
    }
    static getLastProducts(){
        const db=mongodb.getDb();
        return db.collection("products").find().limit(10).toArray();
    }
    static getAllProductsById(id){
        const db=mongodb.getDb();
        return db.collection("products").find({categoryId:id}).toArray();
    }
    static getSearchedProducts(name){
        const db=mongodb.getDb();
        return db.collection("products").find({name:{$regex:name}}).toArray();
    }
 
  
 
}