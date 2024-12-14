//they are like the prechecks before any get, post etc requests, take the hospital example
//before the let's say api calls we write some functions, so that we dont have to repeat the code, and we call these functions in our api calls/http requests
//these are middlewares

//usually are of two types:
//1. auth
//2. input is valid or not 

//the next() wala ka logic h
//usko ni pta uske baad next kya h wo bas allowance de rha
//ORDER is set in the order of the callback fucntions in the http request

//app.use(middleware())
//any request after this line will have this middleware automatically added to it without having to write it 

//IMP : if there ever is an exception, something you didnt have a try catch err for, you dont want to expose your site
//so add a global catch at the end of your code
//global catch example 
app.use((err, req, res, next) => {
  console.error(err.stack);//this wont be part of the code as you want to hide the error from everyone ig, can dive deep into this later
  res.status(500).send('Something broke!');
});