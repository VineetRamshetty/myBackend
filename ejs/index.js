const express=require("express");
const app=express();

const path=require("path");

let port=3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, ()=>{
    console.log("app is listening on port:", port);
});

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/rolldice", (req, res)=>{
    let diceNum=Math.floor(Math.random()*6)+1;
    res.render("rollDice", {diceNum});
});

app.get("/ig/:username", (req, res)=>{
    const instaData=require("./data.json");
    let {username}=req.params;
    let data=instaData[username];
    if(data){
        res.render("instagram", {data});
    }
    else{
        res.render("error");
    }
});