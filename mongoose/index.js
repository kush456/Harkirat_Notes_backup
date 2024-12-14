const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://kushagrabehal456:shmdj90nOkSXMK5Z@cluster0.y0588.mongodb.net/userappnew");

const User = mongoose.model('Users', { name: String , email: String, password: String});

app.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const existingUser = await User.findOne({email : email});
    if(existingUser){
        return res.status(400).send("email id already in use");
    }
    const user = new User({ 
        name: name, 
        email: email,
        password: password
    });

    user.save();
    res.json({ "msg" : "User created succesfully"});
})

