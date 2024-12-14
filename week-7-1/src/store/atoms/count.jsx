import {atom, selector} from "recoil";

//atom is basically useState of recoil world
//this atom can have any components as its children, which means the parents wont be re rendered unecessarily 
export const countAtom = atom({
    key : "countAtom",
    default : 0
})

export const evenSelector = selector({
    key : "evenSelector",
    //this is get method
    get : ({get}) => {//here in curly braces is the function
        const count = get(countAtom);//selector depends on value of countAtom, jb wo changes tb ye logic run krega 
        return count % 2 === 0;
    }
})
//get is part of the object that recoil passes to the get method, get method is different, the function is different
//we could have written it as:
// get : (options) => {
//     const get = options.get;
//     const count = get(countAtom);
//     return count % 2 === 0;
// }

//async data queries
//export const countAtom = atom({
//     key : "countAtom",
//     default : selector{
//         key : "defaultSelector",
//         get : async ()=>{
//              here have your await logic(see net se)
//}
// })
//basically default value canot be async, but it can be a selector that is async
