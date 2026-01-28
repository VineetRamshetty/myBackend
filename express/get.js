const express=require("express");
const app=express();

let port=3000;

app.listen(port, ()=>{
    console.log("app is listening from the port: ", port);
});

app.get("/", (req, res)=>{
    res.send("You are on the Root page");
});

app.get("/about", (req, res)=>{
    res.send("You are on the About page");
});

app.get("/contact", (req, res)=>{
    res.send("You are on the Contact page");
});

app.get("/project", (req, res)=>{
    res.send("You are on the Project page");
});

app.use((req, res) => {
    res.status(404).send("This path is invalid");
});