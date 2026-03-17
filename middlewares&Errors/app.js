const ExpressError=require("./expressError")
const express=require("express");
const app=express();

let port=3000;

// app.use((req, res, next)=>{
//     console.log("i am 1st middleware");
//     next();
// });

// app.use((req, res, next)=>{
//     console.log("i am 2nd middleware");
//     next();
// });

//logger
app.use((req, res, next)=>{
    req.time=new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    return next();
});

app.use("/random", (req, res, next)=>{
    console.log("only for random");
    return next();
});

const checkToken=(req, res, next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        return next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res)=>{
    res.send("data");
});

app.get("/", (req, res)=>{
    res.send("i am root");
});

app.get("/random", (req, res)=>{
    res.send("i am random");
});

app.get("/err", (req, res)=>{
    abcd=abcd;
});

app.get("/admin", (req, res)=>{
    throw new ExpressError(403, "Access to admin is Forbidden");
});

app.use((err, req, res, next)=>{
    console.log("---ERROR---");
    let {status=500, message="Some Error Occured"}=err;
    res.status(status).send(message);
});

app.use((req, res)=>{
    res.status(404).send("Page not found!!");
});

app.listen(port, ()=>{
    console.log("app is listening on port", port);
});