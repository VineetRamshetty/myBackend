const express=require("express");
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

const app=express();

let port=3000;

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))

let posts=[
    {
        id: uuidv4(),
        username: "Vineet",
        content: "I got my first intern at Swiss re"
    },
    {
        id: uuidv4(),
        username: "Vishal",
        content: "I am join IIT Bombay"
    },
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "Vineet is our student"
    }
];

app.get("/posts", (req, res)=>{
    res.render("index", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new");
});

app.post("/posts", (req, res)=>{
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return id===p.id;
    });
    if(post){
        res.render("show", {post});
    }
    else{
        res.send("Error!!");
    }
});

app.patch("/posts/:id", (req, res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>{
        return id===p.id;
    });
    if(post){
        post.content=newContent;
        res.redirect("/posts");
    }
    else{
        res.send("Error!");
    }
});

app.delete("/posts/:id", (req, res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>{
        return id!==p.id;
    });
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        return id===p.id;
    });
    if(post){
        res.render("edit", {post});
    }
    else{
        res.send("Error!");
    }
});

app.listen(port, ()=>{
    console.log(`app is listening on post: ${port}`);
});