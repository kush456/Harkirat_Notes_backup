import { PrismaClient } from "@prisma/client"; //this aint in the npm registery, it is the part of a file created by prisma that has all the definitons of the properties we use to do things like crud operations 

const prisma = new PrismaClient();


//INSERT
async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data : { //data is a key, it means ye data hai to put in, there is also something called select
        email : username, 
        password,
        firstName,
        lastName
    }
  })

  console.log(res);
}

//insertUser("kushagra@gmail.com", "kbbk", "kushagra", "badmos");


//UPDATE

interface UpdateParams {
    firstName?: string;
    lastName?: string;
}
async function updateUser(username : string, {
    firstName,
    lastName
}: UpdateParams){
    const res = await prisma.user.update({
        where : {email : username},
        data : {
            firstName,
            lastName
        }
    })

    console.log(res);
}

//updateUser("kushagra@gmail.com", {firstName : "kushagra_updated", lastName : "badmos_updated"});

//CREATING A TODO
async function createTodo(userId: number, title: string, description: string) {
    const todo = await prisma.toDo.create({
      data: {
        title,
        description,
        userId
      },
    });
    console.log(todo);
  }
  
//createTodo(1, "go to gym", "go to gym and do 10 pushups");


async function getTodosAndUserDetails(userId: number) {
    const todos = await prisma.toDo.findMany({
      where: {
        userId: userId,
      },
      select: {
        title: true,
        description: true,
        done: true,
        user: { //we can now also get the user properties as the fields are related 
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    console.log(todos);
  }
  
getTodosAndUserDetails(1);