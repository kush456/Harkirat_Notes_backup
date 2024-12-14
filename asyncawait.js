function kiratsReadFile() {
    return new Promise(function(resolve) {
        setTimeout(()=>{
            resolve("hi there from resolve")
        }, 3000);
    });
}

async function main() {
    let value = await kiratsReadFile();//it holds the thread for the asyn func commands here
    console.log("hi there inside main");//this happens after the resolve
    console.log(value);
}

main();
console.log("hi there from outside async func");//this happens before as it is outside the async function