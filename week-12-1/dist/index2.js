"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//makes all the properties as optional
//useful here as a user may not want to update everything that can be updated 
function updateUser(updatedProps) {
    return __awaiter(this, void 0, void 0, function* () {
        //hit the database and update the user 
    });
}
const user = {
    name: "John Doe",
    email: "johndoe@example.com"
};
const users = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};
console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }
const userNew = new Map(); //a map with the following key value pair type
userNew.set("kajub", { id: "5", name: "kushagra" });
const getUser = userNew.get("kajub");
console.log(getUser);
