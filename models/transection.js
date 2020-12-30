const mongoose=require('mongoose')
const Transection=mongoose.Schema({
    cust_id:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    Iname:{
        type:String,
        required:false
    },
    amount:{
        type:Number,
        required:true
    },
    remarks:{
        type:String,
        required:false
    }
});
module.exports=mongoose.model('Transections',Transection);