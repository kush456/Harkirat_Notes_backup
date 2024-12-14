"use client"
//used here, as as we said, minimize use client as much as possible
//by default every component is a server component unless this use client mentioned
export default function ButtonComponent(){
    function handler(){
        console.log("hi there");
    }
    return (
        <button onClick={handler} type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Sign in</button>
    )
}