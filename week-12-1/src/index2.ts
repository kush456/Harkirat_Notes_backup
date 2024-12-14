interface User2{
    name:string,
    age:number,
    occupation: string,
    email:string,
    password: string
}

type UpdateProps = Pick<User2, 'name'|'age'|'password'>;
//we can pick from an interface the things we want to use
//basically picking and choosing from a prexisting interface, our type or new interface
//better than writing a new interface or overloading the func with a lot of parameters
//uses generics in its syntax, we did it before 

type UpdateParamsOptional = Partial<UpdateProps>;
//makes all the properties as optional
//useful here as a user may not want to update everything that can be updated 
async function updateUser(updatedProps : UpdateProps){
    //hit the database and update the user 
}

//READONLY
type User3 = {
    readonly name : string,
    readonly email : string
}

const user : User3 = {
    name : "John Doe",
    email : "johndoe@example.com"
}

//we can change the internal values of arrays or objects that are const
//we cannot change strings or the whole array or object that are const
//because earlier the reference remained the same, just internal values changed
//to make anything only readable we use this
//we could have also avoided writing so many readonlys and done const user : Readonly<User3>
//good usecase is config props should be made readonly


//RECORDS
interface User4 {
    id: string;
    name: string;
  }
  
  // Using Record to type an object with string keys and User4 values
  // Cleaner way to write an object/type/interface with key value pairs
  // a ts concept not in js
  type Users = Record<string, User4>;
  
  const users: Users = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
  };
  
  console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }


//MAPS
//better to use when dealing with key value pairs due to set, get etc functionalities
//similar to maps in cpp

type User5 = {
    id: string;
    name: string;
}

const userNew = new Map<string, User5>();//a map with the following key value pair type
userNew.set("kajub", {id : "5", name : "kushagra"})

const getUser = userNew.get("kajub");
console.log(getUser);


//EXCLUDE
//same just the opposite of pick

//TYPE INFERENCE IN ZOD
import { z } from 'zod';
import express from 'express';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});
//Now what if we wanted to get this userprofile schema ka format/ type like abhi zod ke form mai hai toh ni milega na
//isko extract krna hoga

app.put("/user", (req, res) => {
  const result = userProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  // Type of updateBody is inferred from userProfileSchema
  const updateBody = result.data;//this is one way, using .data

  //another way is:
  type updateBodyType = z.infer<typeof userProfileSchema>;//and we get our type
  //this method gets super important when we start to define these same types in our frontend as well, zod is only used in backend

  // update database here
  res.json({
    message: "User updated",
    updateBody
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));