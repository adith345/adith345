// *This is basic template for express
const express = require("express");
const fs = require("fs");
// const { join } = require("path");
const app = express();
const port = 80;
const path = require('path');
const bodyparser = require('body-parser')
// * For serving static files
app.use('/static', express.static('static'))
//* this helps in serving form code to exess

app.use(express.urlencoded({extended: true}));
//*Setting Mongoose
const mongoose = require('mongoose');
const { resolveSoa } = require("dns");
mongoose.connect('mongodb://localhost:27017/contact', {useNewUrlParser: true, useUnifiedTopology: true});
// * Setting pug
app.set('view engine', 'pug')

// * Setting Views Directory
app.set('views',path.join(__dirname,'views'))

// * Endpoint 
const MonContact = new mongoose.Schema({
    name: String,
    email: String,
    may: String
  });
const Contact = mongoose.model('Contact', MonContact);
app.get("/", (req, res)=>{ 
    res.render('index.pug')
});
// t params = {"content":"The Message haconss been Successfully received ","content2" : "Thank You"}

app.get("/contact",(req,res)=>{
    res.render('htmlRender.pug')
})
// app.get("/notes",(req,res)=>{
//     res.render("notes.pug")
// })
app.post("/contact",(req,res)=>{
    var mydata = new Contact(req.body)
    const saved = {'message':'This item has been saved to the database'}
    mydata.save().then(()=>{
    res.render('demo.pug',saved)
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
})})

app.listen(port,hostname,()=>{
    console.log(`The application started successfully on port ${port}`);
})
