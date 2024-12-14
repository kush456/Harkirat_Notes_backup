"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const result = sumOfAge({
    name: "John",
    age: 25
}, {
    name: "Alice",
    age: 30
});
console.log(result);
