const wbm = require('wbm');

module.exports={
    sendMsg:function(phones,message){
        wbm.start().then(async () => {
            //const phones = ['+919966199160'];
            //const message = 'Hello world!!!';
            phones[0]='+91'+phones[0].toString()
            await wbm.send(phones, message);
            await wbm.end();
        }).catch(err => console.log(err));
    }
}
//sendMsg([9391206947],'Transection successsful!!!')