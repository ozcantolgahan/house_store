const mongodb=require("../utility/database");
const Joi = require('@hapi/joi');

module.exports=class User{
    constructor(_id,name,email,password,address) {
        this._id=_id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.address=address;
    }
    saveUser(){
        const db=mongodb.getDb();
        return db.collection("users").insertOne({name:this.name,email:this.email,password:this.password,address:this.address});
    }
    joiValidation(){
        const schema=Joi.object({
            _id:Joi.string(),
            name:Joi.string().min(3).max(30).trim().required(),
            email:Joi.string().email().required(),
            password:Joi.string().trim().required(),
            address:Joi.string().required(),
        });
        return schema.validate(this);
    }
    controlUsersEmail(){
        const db=mongodb.getDb();
        return db.collection("users").find({email:this.email}).toArray();
    }
    static loginUser(email){
        const db=mongodb.getDb();
        return db.collection("users").find({email:email}).toArray();
    }
  



}