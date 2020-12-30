const express=require('express');
const router=express.Router();
const Regi=require('../models/schema');
//var popup=require('popups');
router.get('/login/:name/:password',(req,res,next)=>{
    console.log(req.params.name);
    console.log(req.params.password);
    
    var pwd=req.params.password;
    console.log('Searching....');
    Regi.find({'name':req.params.name},(error,regis)=>{
        if(pwd==regis[0].password){

            res.redirect('http://localhost4200/home');
            console.log('valid');
            }
        else{
            res.redirect('http://localhost4200/index');
            }
    });
});

router.get('/register/:name/:password',(req,res,next)=>{
    let newRegi=new Regi({
        name:req.params.name,
        password:req.params.password,
    });console.log(req.body.name);
    newRegi.save((error,contact)=>{
        if(error){
            //res.json({msg:'Failed to connect'});
            res.writeHead(301,{"Location":"http://localhost:4200/login"});
            console.log(error);
        }else{
            //res.json({msg:'Connected'});
            res.writeHead(301,{"Location":"http://localhost:4200/login"});
        }
    })
});
router.get('/def',(req,res,next)=>{
    res.send('Registered');
});

module.exports=router;