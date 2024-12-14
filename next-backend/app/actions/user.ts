//now your doubt about the post endpoint

//firstly here client is talking to server(as a client comp makes that http req)

//but what if we need to make that req from our server only?
//and what if we could have a function, that can be called both from server side and client side
//when called from server side, it wont send an http req
//when called from client side it will sort of send an http req, but wont expose it as an http endpoint, kind of like RPC or gRPC, which idk what is yet


//so we deleted our api folder(in notes folder)
//we made an actions folder, uske andar user.ts because here user actions will be present

"use server"
//very imp, as incase this is called by a client component needs to know this is a server function and not a client function

import client from "@/db"

export async function signup(username: string, password: string) { //we have parameters instead of them being extracted from our http req
    // should add zod validation here
    const user = await client.user.create({
        data: {
            username: username,
            password: password
        }
    });

    console.log(user.id);

    return "Signed up!"
}

//ADVANTAGE:
//we know the type of return when we make this call
