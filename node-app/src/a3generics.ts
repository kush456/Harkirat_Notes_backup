//problems
//say this is what we need to do 
type input = number | string;
function first(arr : input[]){
    return arr[0];
}

const val = first(["kushagra", 1,2,4,"harkirat"]);
//console.log(val.toUpperCase());
//1. user did not expect ki dono type ke inputs honge 
//2. typescript is not smart enough to give the type string to value because it is a string even if the array passed only had strings
// so basically toUpperCase jaise functions we cannot use as number bhi ho ksta hai acc to ts, usko lagta hai val ki type is "input"

//solution : generics 
function getFirstElement<T>(arr: T[]) : T{
    return arr[0];
}

//we are saying i am passing you an argument jiska type i dont know, let it be T
//hence it is an arr of t type, T[]
//return type is T, although wo typescript figure out krlega
//so now ts knows val2 is a string because i passed T as string, although ye bhi ts can figure out
const val2 = getFirstElement<string>(["kushagra", "harkirat"]);

//other problem aint solved apparently


//also while installing npm packages see the diff if typescript mai krna ho
//like for express it is npm install express @types/express