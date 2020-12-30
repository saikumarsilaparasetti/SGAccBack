const mongoose=require('mongoose')
const Customer=mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    s_o:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    contact:{
        type:Number,
        required:false
    },
    balance:{
        type:Number,
        require:true
    }

});
const Cust=module.exports=mongoose.model('customers',Customer);