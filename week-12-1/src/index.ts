interface User{
    name : string,
    age : number
}

function sumOfAge(user1: User, user2: User){
    return user1.age + user2.age;
}

const result = sumOfAge({
    name : "John",
    age : 25
}, {
    name : "Alice",
    age : 30
})

console.log(result);