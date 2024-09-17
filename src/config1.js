const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/last",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("mongo db connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const LogInSchema1=new mongoose.Schema({
    domain:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    }
});
//collection part
const collection1=new mongoose.model("questions",LogInSchema1)
module.exports=collection1