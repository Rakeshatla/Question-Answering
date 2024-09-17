const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/last")
.then(()=>{
    console.log("mongo db connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    domain:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    }
});
//collection part
const collection=new mongoose.model("credentials",LogInSchema)
module.exports=collection