import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { DATABASE_URL,SECRET_KEY } from '../../links'
import { SignInInput,signInInput,signupInput } from "@jayant-issar/storyvault-common";
import z from 'zod'

export const userRouter = new Hono();

userRouter.post('/signup',async (c)=>{ //  c here stands for context, hono gives us a single object
    
    const body  = await c.req.json() // way to get body in hono
    
    //@ts-ignore
    const { error } = signupInput.safeParse(body);

    if (error) {
    return c.json({
        message: "invalid inputs"
    });
    }


    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
      }).$extends(withAccelerate())
  
    const userExists = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(!userExists){
      const author = await prisma.user.create({
        data:{
          name: body.name,
          email:body.email,
          password: body.password 
        }
      })
    
      const token = await sign({id: author.id},SECRET_KEY)
      return c.json({
        message: "user created",
        name: author.name,
        token : token
      })
    }else{
      c.status(411)
      return c.json({
        message: "the email already exists"
      })
    }
    
})
  

userRouter.post('/signin',async (c)=>{
    //connecting to the db
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    
    //@ts-ignore
    const { error } = signInInput.safeParse(body);

    if (error) {
    return c.json({
        message: "invalid inputs"
    });
    }

    //finding author
    const author = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })
    //if user not found (i.e author does not exits on database)
    if(!author){
      c.status(403)
      return c.json({
        message: "user not found, worng emailId"
      })
    }
    //user found checking password
    if (author.password == body.password){
      const token = await sign({id: author.id},SECRET_KEY)
      return c.json({
      message: "user signed in",
      name: author.name,
      token : token
      })
    }else{
      c.status(401)
      return c.json({
        message:"wrong password"
      })
    }
  
    return c.text("ssdf")
    
})