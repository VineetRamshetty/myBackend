const mongoose=require("mongoose");

main().then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("error");
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
};

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

const User=mongoose.model("User", userSchema);

// const user1=new User({
//     name:"Vineet",
//     email:"vineet@gmail.com",
//     age:20
// });

// user1.save();

// const user2=new User({
//     name:"Vishal",
//     email:"vishal@gmail.com",
//     age:18
// });

// user2.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.insertMany([
//     {name:"Venu", email:"venu@gmail.com", age:55},
//     {name:"Pratibha", email:"pratibha@gmail.com", age: 52}
// ]).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.find({}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findOne({name: "Vineet"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findById("699c02a24f1cb44a520ff024").then((res)=>{
//     console.log(res);
// });

// User.updateOne({name:"Vineet"}, {age:7}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.updateMany({age:{$gt:20}}, {age:2}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findOneAndUpdate({name:"Vishal"}, {age:17}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findOneAndUpdate({name:"Vishal"}, {age:15}, {new:true}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

User.findOneAndDelete({name:"Vineet"}).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});