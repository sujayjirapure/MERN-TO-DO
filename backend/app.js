const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());  //imp for post

app.get('/',(req ,resp) => {
    resp.send('my server is started'); 
    //console.log('sever started');   
})

app.get('/home',(req ,resp) => {
    const productlist = [
        {
            name: "product 1",
            id: 1
        }
    ]
    resp.send(productlist);
    console.log('product api hit...'); 
})

app.post('/', (req, resp) => {
    try{
        console.log('post api data -', req.body);
        resp.send('api sucessfull...');
    }
    catch(err){
        resp.send("faild...");
    }
})


console.log("sujay server is running...");
app.listen(4000);