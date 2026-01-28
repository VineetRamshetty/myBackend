const express=require("express");
const app=express();

let port=3000;

app.listen(port, ()=>{
    console.log(`app is listening on port: ${port}`);
});

app.use((req, res)=>{
    console.log("request received");
    let code="<h1>To Do List:</h1> <ul><li>Cry</li><li>Die</li><li>Repeat</li></ul>";
    res.send(code);
});