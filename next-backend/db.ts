//good practice to avoid generating prisma client again and again on every hot reload
//do in dev mode, in prod mode no bt 

import { PrismaClient } from '@prisma/client'

console.log("inside db");
const prismaClientSingleton = () => {
    console.log("prisma client generated");
    return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton() //says if prisma client already exists then dont generate a new one, or call teh prismaclientsingelton function

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma