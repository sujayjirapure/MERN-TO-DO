const express = require('express');
const app = express();


app.get('/',(req ,resp) => {
    resp.send('my server is started'); 
    //console.log('sever started');   
})

app.get('/home',(req ,resp) => {
    const productlist = [
        {
            name: "product 1",
            id: 1
        },
        {
            name: "product 2",
            id: 2
        }
    ]
    resp.send(productlist);
    console.log('product api hit...'); 
})

console.log("sujay server is running...");
app.listen(4000);