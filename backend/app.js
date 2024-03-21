const express = require('express');
const app = express();


app.get('/',(req ,resp) => {
    resp.send('my server is started'); 
    //console.log('sever started');   
})


console.log("sujay server is running...");
app.listen(5000);