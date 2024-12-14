//for the offline lec 

//enums
// yaha if statements se kr skte ho, ya type bhi use krke use or and usme ye specific string daaldo
//but ye more readable hai 
//also ye ek concept hai, js file mai ye kuch actually hota nhi bas khichdi paka kar implemented hai 
enum Direction {
    Up, 
    Down,
    Left,
    Right
}

function doSomething(keyPressed : Direction){
    console.log(keyPressed);
}

doSomething(Direction.Up);//prints 0
doSomething(Direction.Right);//prints 2, basically array indexing by default 

//we can explicitly give them a value as well, but then sbko dena hoga 
// enum Direction {
//     Up = "up", 
//     Down = "down",
//     Left = "left",
//     Right = "right"
// }

//a popular use case of enums:
//status codes
// we can create an enum for them, then use them in our code
// better readability and if the code changes for a particular status then ek change se sb change ho jayega