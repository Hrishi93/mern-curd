const express = require('express');
const cors=require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 5001;

//Cors
app.use(cors());
app.use(express.json());
//db Connection
mongoose.connect('mongodb://127.0.0.1:27017/userdata').then( () =>{
    console.log('DB Connected Properly');
}).catch((error) =>{console.log("error")});

//User Schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   }, 
   {timestamps:true}
);

const User = mongoose.model("user", userSchema);

//Create User
app.post("/createuser", async (req,res) => {
    try{
        const bodyData = req.body;
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});

//Get Users or Read all Users
app.get("/getusers", async (req,res) =>{
    try{
        const userData= await User.find({});
        res.send(userData);
    }catch(error){
        res.send(error);
    }
})

//Get perticular User by id
app.get("/read/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById({_id:id});
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});

//Update User by id
app.put("/update/:id", async (req, res) => {
    try{
        const id=req.params.id;
        const userData=await User.findByIdAndUpdate({_id:id}, req.body,{
            new:true,
        });
        res.send(userData);
    }catch(error){
        res.send(error);
    }
});


//Delete User by id
app.delete("/delete/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const userData=await User.findByIdAndDelete({_id:id})
        res.send(userData);
    }catch(error){res.send(error);}
});

app.get("/", (req , res) => {
    res.send("Hello on Browser... MERN STUDY");
});

app.listen(PORT, () =>{
    console.log(`Server is running on the ${PORT}`)
});
