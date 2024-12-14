// const x : number = 10; //this how we declare the type, extra on top of js
// console.log(x);

function greet(firstName : string){ //telling the type of argument is how we give functions a type 
    console.log("Hello " + firstName);
}

greet("harkirat");

function sum(a: number, b:number): number{ //this is how you give a return type
    return a + b;
}
//type inference: even if i did not give it a return type typescript would have figured the return type out, but it is good practice to give it a type

const value = sum(1,2);//type inference here as well
console.log(value);


//passing a fn as an argument to another function
function runAfter5(fn: () => void){ 
    setTimeout(fn, 5000);
}
//() as no arguments in fn, void as the return type is void

runAfter5(function(){
    console.log("I will run after 5 seconds");
});
//a recap that the function passed as an argument inside another function is called a callback


//giving type to an object 
//it is done in a similar fashion, we give it a type in the form of an object where we define the type of each property
//to avoid code repititon we create interfaces 
interface User {
    firstName : string;
    lastName : string;
    age : number;
    email?: string
};
//email has ? which means it is optional, we can or we cannot put it in a User interface type object, but if we do put it it is suppposed to be a string 
function isLegal(user : User){
    if(user.age>18) return true;
    else return false;
}

const ans = isLegal({
    firstName: "John",
    lastName: "Doe",
    age: 25
})

console.log(ans);

//types and their use cases
//almost similar to interfaces, usually only used when they are specifically required otherwise interfaces are used 
type User2 = {
    firstName: string;
    lastName: string;
    age: number;
};

//beneift 1, allows unions
type User3 = string | number | boolean; //basically can be any of the three
//we could also actually do it as 
interface User4{
    id : (number | string);
} 

//benefit 2 is intersection(actually union ni hua mathematically?)
type Employee = {
    name: string;
    startDate: Date;
};

type Manager = {
    name: string;
    department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software Developer"
};


//standard interview question
//types are used if you know that something can be of multiple types, or you need to use and, otherwise we mostly use interfaces
//interfaces are used to implement a class, then we cannot use types 

//also, to define arrays we can only use types not interfaces if we wanna use that logic
// for arrays just put [] next to the type of the contents in it
//eg: type NumberArr = number[];