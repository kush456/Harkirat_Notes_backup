import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from 'zod';
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>(); //The Bindings property represents the types of environment variables available in the application. Here, it defines one environment variable, DATABASE_URL, and specifies it as a string.


app.post('/api/v1/signup', async (c) => {
  // means we can get this env variable access only inside the route due to the context
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  //zod validation
  const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const requestData = await c.req.json();
  const parsedData = signupSchema.safeParse(requestData);

  //inserting data into the db
  if (parsedData.success) {
    //logging the parsed data
    console.log('Parsed data:', parsedData.data);

    //inserting using prisma 
    const user = await prisma.user.create({
      data : {
        email : parsedData.data.email, 
        name : parsedData.data.username, 
        password : parsedData.data.password,  
      }
    });

    //just checking if data was inserted into it or not
    if(user){
      console.log('User created:', user);
    } else{
      console.error('Error while creating user:', user);
      return c.json({success : false, message : "Failed to create user"})
    } 

    //jwt 
    const token = await sign(user, c.env.JWT_SECRET);
    return c.json({
      jwt : token 
    })
  } else {
    console.error('Error:', parsedData.error);
    return c.json({success : false, message : parsedData.error.message})
  }
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {
	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})


export default app


