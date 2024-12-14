const fs = require("fs");

//without promise
//the async function
function kiratsReadFile(cb){
    fs.readFile("a.txt", "utf-8", (err, data) => {
        cb(data);
    });
}

//the callback function
function processData(data){
    console.log("The data read from the file is:", data);
}

kiratsReadFile(processData);

//with promise
//the async function
function kiratsReadFile(){//no callback
    return new Promise(function(resolve) {//has a resolve function
        fs.readFile("a.txt", "utf-8", (err, data) => {
            resolve(data);//IMP: the goal is here you make some async work, some database call etc
        });
    })
    
}

//the callback function
function processData(data){
    console.log("The data read from the file is:", data);
}

var a = kiratsReadFile();//the promise is stored here so if we log it, it says pending promise 
a.then(processData);//once the promise is resolved, processData is called 

