const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const ejs = require("ejs");

const messageid = require("./models/collection.js");
require("./db/conn");

app.use(express.static('views'))
app.use('/css', express.static(__dirname+'views/css'));
app.use('/images', express.static(__dirname+'views/images'));
app.use('/js', express.static(__dirname+'views/js'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs"); // if no templates, and directly view

app.get("/",(req,res)=>
{
    res.render("index");
});

app.post("/send",async(req,res)=>
{
    try
    {

        const message = new messageid({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
            });
            const entered_message = await message.save();
            console.log(entered_message);
            res.render("success_msg");
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error);
    };
});

app.get("/view_msg",async(req,res)=>
{
    try
    {
    const msg = await messageid.find();
    //console.log(msg)
    res.render("view_messages",{msg});
    }
    catch(err){}
});

app.get("/delete_msg",async(req,res)=>
{
    const _id = req.query._id;
    console.log(_id);
    try
    {
    const msgDelete = await messageid.deleteOne( { _id } );
    console.log(msgDelete);
    const msg = await messageid.find();
    res.redirect('/view_msg');
    }
    catch(err){}
});

app.get("/enter_pwd",async(req,res)=>
{
    
    //console.log(msg)
    res.render("enter_password");
    
});

app.post("/check_pwd",async(req,res)=>
{
    
    //console.log(msg)
    const entered_pwd = req.body.pwd;
    if(entered_pwd=='hh4h43h65265625gf334rt')
    {
        res.redirect('/view_msg');
    }
    else
    {
        res.render("wrong_pwd");
    }
    
});

app.listen(port,()=>
{
    console.log(`Server is running on port no ${port}`);
})