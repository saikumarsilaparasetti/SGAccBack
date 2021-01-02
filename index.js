var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var bodyparser=require('body-parser');
var cors=require('cors');

var app=express();
//const port=3000;
const port=process.env.PORT || 8080;
 const route=require('./routes/route');
mongoose.connect('mongodb://localhost:27017/SGAcc',{ useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{
    console.log('Connected to data base');

});
mongoose.connection.on('error',(error)=>{
    console.log('Error in connection'+error);

});
 app.use(cors());
 app.use(bodyparser.json());
 app.use(express.static(path.join(__dirname,'public')));
app.use(route)

app.listen(port,(result,error)=>{
    if(error)
        console.log(error);
    console.log('server started at port :'+port );
});
