const { faker } = require('@faker-js/faker');
const {v4:uuidv4}=require("uuid");
const mysql = require('mysql2');
const express=require("express");
const methodOverride=require("method-override");
const path=require("path");
const app=express();

let port=3000;

app.use(methodOverride("__method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'VineetHari@108'
});

let q="INSERT INTO user (id, username, email, password) VALUES ?;";
let users=[["123c", "userc", "userc@gmail.com", "userc@123"], ["123d", "userd", "userd@gmail.com", "userd@123"],];
let data=[];

let getRandomUser=() => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// for(let i=0; i<100; i++){
//   data.push(getRandomUser());
// }

// try{
//   connection.query(q, [data], (err, result)=>{
//     if(err){
//       throw err;
//     }
//     console.log(result);
//     console.log(result.length);
//     console.log(result[0]);
//     console.log(result[1]);
//   });
// }catch(err){
//   console.log(err);
// }

// connection.end();


// console.log(getRandomUser());

app.get("/", (req, res)=>{
  let q="SELECT COUNT(*) FROM user";
  try{
    connection.query(q, (err, result)=>{
      if(err){
        throw err;
      }
      let count=result[0]["COUNT(*)"];
      res.render("home", {count});
    });
  }
  catch(err){
    console.log(err);
    res.send("some error in DB");
  }
});

app.get("/user", (req, res)=>{
  let q="SELECT * FROM user";
  try{
    connection.query(q, (err, users)=>{
      if(err){
        throw err;
      }
      res.render("showusers", {users});
    });
  }
  catch(err){
    console.log("some error");
  }
});

app.get("/user/new", (req, res)=>{
  res.render("new");
});

app.post("/user/new", (req, res)=>{
  let {username, email, password}=req.body;
  let id=uuidv4();
  let q=`INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
  try{
    connection.query(q, [id, username, email, password], (err, result)=>{
      if(err){
        throw err;
      }
      res.redirect("/user");
    });
  }
  catch(err){
    res.send("some error in insert");
  }
});

app.get("/user/:id/edit", (req, res)=>{
  let {id}=req.params
  let q=`SELECT * FROM user WHERE id="${id}"`;
  try{
    connection.query(q, (err, result)=>{
      if(err){
        throw err;
      }
      let user=result[0];
      res.render("edit", {user});
    });
  }
  catch(err){
    console.log("some error in edit db");
  }
});

app.patch("/user/:id", (req, res)=>{
  let {id}=req.params;
  let {password: formPass, username: newUsername}=req.body;
  let q1=`SELECT * FROM user WHERE id="${id}"`;
  try{
    connection.query(q1, (err, result)=>{
      if(err){
        throw err;
      }
      let user=result[0];
      if(user.password!=formPass){
        res.send("WRONG password");
      }
      else{
        let q2=`UPDATE user SET username="${newUsername}" WHERE id="${id}"`;
        connection.query(q2, (err, result)=>{
          if(err){
            throw err;
          }
          res.redirect("/user");
        });
      }
    });
  }
  catch(err){
    res.send("some error in db while updating");
  }
});

app.get("/user/:id/delete", (req, res)=>{
  let {id}=req.params;
  let q=`SELECT * FROM user WHERE id="${id}"`;
  try{
    connection.query(q, (err, result)=>{
      if(err){
        throw err;
      }
      let user=result[0];
      res.render("delete", {user});
    });
  }
  catch(err){
    res.send("some error in delete");
  }
});

app.delete("/user/:id", (req, res)=>{
  let {id}=req.params;
  let {password: formPass}=req.body;
  let q1=`SELECT * FROM user WHERE id="${id}"`;
  try{
    connection.query(q1, (err, result)=>{
      if(err){
        throw err;
      }
      let user=result[0];
      if(user.password!=formPass){
        req.send("WRONG password");
      }
      else{
        let q2=`DELETE FROM user WHERE id="${id}"`;
        connection.query(q2, (err, result)=>{
          if(err){
            throw err;
          }
          res.redirect("/user");
        });
      }
    });
  }
  catch(err){
    res.send("some error in delete");
  }
});

app.listen(port, ()=>{
  console.log("app is listening on port:", port);
});