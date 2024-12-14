// import { Hono } from 'hono'

// const app = new Hono()


// //middleware in hono
// async function authMiddleware(c:any, next:any){
//   //c is the context of the request, which means the request and the response object together
  
//   if(c.req.header("Authorization")){
//     //Do validation
//     await next();
//   } else{
//     return c.text("you dont have access");
//   }
// }
// app.post('/', authMiddleware, async (c) => {
//   const body = await c.req.json()
//   console.log(body);
//   console.log(c.req.header("Authorization"));
//   console.log(c.req.query("param"));

//   return c.text('Hello Hono!')
// })

// export default app

//we are now using cloudflare to deploy it
//cloudfare demands us to not include the dependencies that are node js specific and to connect our cloudfare worked to a connection pool
//which then connects to a database, and not directly worked to db



import { Hono, Next } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from 'hono/adapter'

const app = new Hono()

app.post('/', async (c) => {
  // Todo: add Zod validation here
  const body = await c.req.json()
  const { DATABASE_URL } = env<{ DATABASE_URL: string }>(c)

  const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate()) //needed whenever we use the client

  console.log(body)

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  })

  return c.json({msg: "User created"})
})

export default app

//idk if this works but i am leaving it here only fuck this for now 