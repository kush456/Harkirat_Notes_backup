const jwt = require("jsonwebtoken");

const value = {
    name : "kushagra", 
    pwd : "boobs"
}

//we generate our token 
const token = jwt.sign(value, "mysecret");
console.log(token);

//this token has been generated using this secret
//anyone can see the token and get the value object, yes similar to anyone can see my checkbook with my signature and try to replicate it
//but to get access to my acc it needs to be verified, to be verified it needs this secret
