"use strict";
function greet(firstName) {
    console.log("Hello " + firstName);
}
greet("harkirat");
function sum(a, b) {
    return a + b;
}
const value = sum(1, 2);
console.log(value);
function runAfter5(fn) {
    setTimeout(fn, 5000);
}
runAfter5(function () {
    console.log("I will run after 5 seconds");
});
;
function isLegal(user) {
    if (user.age > 18)
        return true;
    else
        return false;
}
const ans = isLegal({
    firstName: "John",
    lastName: "Doe",
    age: 25
});
console.log(ans);
const teamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software Developer"
};
