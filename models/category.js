const mongodb=require("../utility/database");
module.exports=class Category{
    constructor(_id,name,parent,detail) {
        this._id=_id;
        this.name=name;
        this.parent=parent;
        this.detail=detail;
    }
    static getAllCategories(){
        const db=mongodb.getDb();
        return db.collection("categories").find().toArray();
    }
    static getCategoryId(name){
        const db=mongodb.getDb();
        return db.collection("categories").findOne({name:name});
    }
 
}