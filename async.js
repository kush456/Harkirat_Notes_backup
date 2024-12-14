console.log("hi there");

setTimeout(() => {
    console.log("hi from async func");
}, 10);

let a = 0;
for(let i=0; i<10000000000; i++){
    a+=1;
}

console.log(a);

//this proves that since regardless of how much i increase the number, setTimeout wala hoga toh last mai hi, as thread needs to be idle to do the pending async task
//you can see this in harkirat ka video only
//the two setitmeouts prove that jo pehle khtm hua task, wo pehle queue mai jayega out of the async ones 
