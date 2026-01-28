const express=require("express");
const app=express();

let port=3000;

app.listen(port, ()=>{
    console.log("app is listening on port:", port);
});

app.get("/", (req, res)=>{
    res.send("Hello! I am Root");
});

app.get("/:name", (req, res)=>{
    res.send(`Hello! ${req.params.name}`);
});