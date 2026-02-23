const mongoose=require("mongoose");

main().then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("error");
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
};

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    price:{
        type:Number
    }
});

const Book=mongoose.model("Book", bookSchema);

const book1=new Book({
    // title:"Maths 12",   ERROR   
    author:"RD Sharma",
    prize:9999
});

book1.save();