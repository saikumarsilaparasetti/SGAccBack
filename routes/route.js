const express=require('express')
var router=express.Router()
//var mongoose=mongoose()
const Admin=require('../models/admin')
const Customer=require('../models/customer')
const Transection=require('../models/transection')
const { Mongoose } = require('mongoose')
var messaging =require('../messaging')

//const admin = require('../models/admin')

router.post('/',(req,res)=>{
    res.status(200).send('<html><h1>Hello world!!</h1></html>')
})

router.post('/post',(req,res)=>{
    res.status(200).send('<html><h1>Hello world!!</h1></html>')
})


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
    Customer.find({'contact':req.body.contact},(err,result)=>{
//        console.log(result);
        try{
            if(result[0].contact==req.body.contact){
                res.send([{'added':false}])
                //process.exit()
                //console.log('Okay');
            }else{
                const customer=new Customer(req.body)
                try{
            
                    customer.save()
                    res.status(200).send([{'added':true}])
                
                }catch(e){
                    res.status(400).send(e)
                }
            }
        }catch(e){
            res.status(400).send(e)
        }
    })

    //res.end('validate called')
})

router.post('/issue',async (req,res)=>{
    console.log(req.body)
    process.env.timeZone='Asia/Calcutta';
    req.body.time=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
    const transection=new Transection(req.body);
    let contact;
    let tem;
    try{
        //Customer.update({name:req.body._id},{balance:req.body.amount});
        let fin_bal=0;
        await Customer.find({'_id':req.body.cust_id},function(err,doc){
            if(doc[0]!=undefined){
                contact=doc[0].contact;
                console.log(typeof req.body.amount)
                doc[0].balance=doc[0].balance+req.body.amount;
                doc[0].save();
                fin_bal=doc[0].balance;
                tem=doc;
            }
            console.log(doc[0].balance)

        })
        transection.save();
        let doc=tem;
        if(contact!=undefined)
            messaging.sendMsg([contact],'Hello '+doc[0].name+',\nGreetings from Sai Govind GL stores.\n\nYour account has a transaction worth '+(req.body.amount).toFixed(2)+' at '+req.body.time+'.\nYour final credit balance is '+(fin_bal).toFixed(2)+'\nThankyou.\nHave a great day: )');
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
            //res.send([0])    
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