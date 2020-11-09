const MongoClient=require("mongodb").MongoClient;
const url="mongodb://localhost:27017";
var _db;
module.exports={

    connectServer:function(callback){
        MongoClient.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},function(err,result){
            _db=result.db("was_store");
        });
    },
    getDb:function(){
        return _db;
    }
};