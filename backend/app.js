const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());  //imp for post
const mongoose = require('mongoose');


//scehma 
const userSchema = new mongoose.Schema({
    work: String,
    deadline: String
})

const todomern = mongoose.model('todomern', userSchema)
//    anything                 table name       same as upper schema (to coonnect)

//default 
app.get('/',(req ,resp) => {
    resp.send('my server is started'); 
    //console.log('sever started');   
})

//show all data from data base to front end
app.get('/data',async (req ,resp) => {
   const docs = await todomern.find({});
   resp.json(docs);   
})

//deletee
app.delete("/deletetodo/:id", async (req ,resp) => {
    const id = req.params.id
    //console.log(id);     printing on back console
    const data = await todomern.deleteOne({_id : id})
    resp.send("deleted...");
})

app.post('/',async (req, resp) => {
    try{
        let user = new todomern();
        user.work = req.body.work;
        user.deadline = req.body.deadline;
        const doc = await user.save();
        
        console.log('post api data -', doc);
        
    }
    catch(err){
        resp.send("faild...");
    }
})


//connect DB
// const dburl = 'mongodb+srv://sujay03:sujay03@cluster0.23hwmxr.mongodb.net/restapi?retryWrites=true&w=majority';

const dburl = 'mongodb+srv://sujay03:sujay03@cluster0.23hwmxr.mongodb.net/todomern?retryWrites=true&w=majority';

mongoose.connect(dburl).then(() => {
    console.log('mongooDB is connected...');
}).catch((err) => console.log('MongoDB not connected...'));
 


console.log("sujay server is running at 4000...");
app.listen(4000);
