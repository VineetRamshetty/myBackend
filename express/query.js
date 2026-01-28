const express=require("express");
const app=express();

let port=3000;

app.listen(port, ()=>{
    console.log("app is listening on port:", port);
});

app.get("/search", (req, res)=>{
    let {q}=req.query;
    if(!q){
        return res.send("<h1>Nothing searched</h1>");
    }
    res.send(`<h1>search results for query: ${q}</h1>`);
});