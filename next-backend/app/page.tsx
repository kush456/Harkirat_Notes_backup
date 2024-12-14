import client from "@/db";


//ASYNC COMPONENTS NOTE:
//standard way of fetching data and using it in a component is by making the component async as well
//can only be done for server components, not client ones
// you will see on the index.html file in network, name and email are there, they have been server side rendered(because the nextjs server is returning the html)

//BETTER FETCHING(means GET) NOTES:
//VERY IMP: since this is a server componenet here(not use client na)
//this way we are telling our next server to talk to itself, then get shit from the database
//does not seem right
// async function getUserDetails() {
//   const response = await axios.get("http://localhost:3000/api/user")//note : not the right way
//   return response.data;
// }

//BETTER FETCHING:
async function getUserDetails() {
  const user = await client.user.findFirst();
  console.log(user);
  return{
    email : user?.username,
    name : "kushagra"
  }
  
}
export default async function(){
  
  await new Promise((resolve) => setTimeout(resolve, 5000));//artificial timer for 5 seconds 
  const userData = await getUserDetails();
  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="border p-8 rounded">
                <div>
                    Name: {userData?.name}
                </div>
            
                {userData?.email}
            </div>
        </div>
    </div>
  )
}


//ASYNC COMPONENTS:
//But how does it fulfill the use of useEffect by doing this?
//Definitions to get cleared:
//When we load the page, initial render of the component happens, called mounting
//If anything in the component changes, it is re rendered

//Now here, since first the data is fetched due to the async nature of the component
//upon a re render, the nextjs server does not need to make another request to fetch the data
//the data was pre fetched, before the component mounted
//data is already there with use, so on a re render it is still there