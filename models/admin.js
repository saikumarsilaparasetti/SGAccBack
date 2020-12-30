const mongoose=require('mongoose')
const Admin=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    }
});
module.exports=mongoose.model('Admin',Admin);