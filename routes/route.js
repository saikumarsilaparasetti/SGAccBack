const express=require('express')
var router=express.Router()
//var mongoose=mongoose()
const Admin=require('../models/admin')
const Customer=require('../models/customer')
const Transection=require('../models/transection')
const { Mongoose } = require('mongoose')
//const admin = require('../models/admin')

router.post('/registerAdmin',(req,res)=>{
    console.log(req.body.name)
    const admin=new Admin(req.body)
    try{
        admin.save()
        res.status(200).send()
    
    }catch(e){
        res.status(400).send(e)
    }
    //res.end('validate called')
})

router.post('/registerCustomer',(req,res)=>{
    console.log(req.body.name)
    const customer=new Customer(req.body)
    try{

        customer.save()
        res.status(200).send()
    
    }catch(e){
        res.status(400).send(e)
    }
    //res.end('validate called')
})

router.post('/issue',async (req,res)=>{
    console.log(req.body)
    process.env.timeZone='Asia/Calcutta';
    req.body.time=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
    const transection=new Transection(req.body);
    
    try{
        //Customer.update({name:req.body._id},{balance:req.body.amount});
        let fin_bal=0;
        await Customer.find({'_id':req.body.cust_id},function(err,doc){
            console.log(typeof req.body.amount)
            doc[0].balance=doc[0].balance+req.body.amount;
            doc[0].save();
            fin_bal=doc[0].balance;
            //console.log(doc[0].balance)

        })
        transection.save();
        res.status(200).send([{'id':req.body.cust_id,fin_bal}]);
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }    
})

router.post('/getStatement',async (req,res)=>{
    console.log(req.body);
    try{
        await Transection.find({'cust_id':req.body.cust_id},(err,doc)=>{
            res.status(200).send(doc)
        })
    }catch(e){
        res.status(400).send(e);
    }
})


router.post('/login',async (req,res)=>{
    await Admin.find({'name':req.body.username},(error,admin)=>{
        console.log(req.body);
        if(admin[0] && req.body.password==admin[0].password){

            //res.redirect('http://localhost4200/home');
              
            console.log('valid');
            res.send(true)    
        }
        else{
            //res.redirect('http://localhost4200/index');
            console.log(false)
            //res.send(0)    
        }
    });
})




router.post('/verify',async (req,res)=>{
    //console.log(typeof req.body.id);
    //console.log(isNaN(req.body.id));
    if(isNaN(req.body.id)){//if id is name
        await Customer.find({'name':req.body.id},(error,admin)=>{
            //console.log(req.body);
            if(admin[0]){
                //res.redirect('http://localhost4200/home');
                //console.log(admin[0]);
                res.send(admin)    
            }
            else{
                //res.redirect('http://localhost4200/index');
                //console.log(false)
                res.send(null)
                //res.end('No such user')    
            }
        });
    }
    else if(!isNaN(req.body.id)){//if id is number
        console.log("In number");
        await Customer.find({'contact':req.body.id},(error,admin)=>{
            //console.log(req.body);
            if(admin[0]){
                //res.redirect('http://localhost4200/home');
                //console.log(admin[0]);
                res.send(admin)    
            }
            else{
                //res.redirect('http://localhost4200/index');
                //console.log(false)
                res.send(null)
                //res.end('No such user')    
            }
        });
    }
})









module.exports=router