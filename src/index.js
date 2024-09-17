const express = require('express');
const path = require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const collection1=require("./config1");
const mongoose=require("mongoose")
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
//convert data into json format 
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());


app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.static("views"));
app.use(express.static("src"));

app.get('/login', (req, res) => {
    res.render('login');

});




app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup",async(req,res) =>{
    const data={
        name: req.body.username,
        domain: req.body.domain,
        email: req.body.email,
        password: req.body.password,
        confirm_password:req.body.cpassword
    }
    
    //check if he is already exits
    const existingUser =await collection.findOne({email: data.email});
    if(existingUser){
        res.send("already exists");
    }else{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(data.password,saltRounds)

        data.password=hashedPassword;//replace pass with hashed

        try {
        const userData = await collection.create(data);
        console.log(userData);
        res.redirect('/login'); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }}

});
//user login

app.post("/login",async(req,res) =>{
    try{
        const check=await collection.findOne({email:req.body.email});
        if(!check){
            res.send("user not found")
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.render("home");
        }else{
            req.send("wrong password");
        }
    }catch{
        res.send("wrong details");
    }
});

app.get('/submit_post', (req, res) => {
    res.render('post');
});
app.post("/submit_post",async(req,res) =>{
    const data1={
        domain: req.body.domain,
        question: req.body.question
    }
    
    //check if he is already exits
    try {
        const userData = await collection1.create(data1);
        res.send("question posted  successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in posting question");
    }

});



app.get('/user-questions', (req, res) => {
    res.render('que');
});



app.get('/user-questions1', async (req, res) => {
    try {
        const questions = await collection1.aggregate([
            {
                $lookup: {
                    from: 'credentials', 
                    localField: 'domain', 
                    foreignField: 'domain', 
                    as: 'userData'
                }
            },
            {
                $unwind: '$userData'
            },
            {
                $project: {
                    _id: 1,
                    question: 1,
                    user: '$userData.name' // Assuming username is the field in the signup collection
                }
            }
        ]);
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


const replySchema = new mongoose.Schema({
    questionId: mongoose.Schema.Types.ObjectId,
    reply: String
});

const Reply = new mongoose.model("Reply", replySchema,"Reply");

app.post('/reply', async (req, res) => {
    try {
        const { questionId, reply } = req.body;
        // Save the reply to the database
        await Reply.create({ questionId, reply });
        res.sendStatus(200); // Reply saved successfully
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/message', (req, res) => {
    res.render('message');
});

app.get('/user-questions-and-replies/:userId', async (req, res) => {
    try {
        const userId = req.params._id;

        // Find questions asked by the user
        const questions = await collection1.find({ userId });

        // Get IDs of questions asked by the user
        const questionIds = questions.map(question => question._id);

        // Find replies to the user's questions
        const replies = await Reply.find({ questionId: { $in: questionIds } });

        res.json( replies );
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});