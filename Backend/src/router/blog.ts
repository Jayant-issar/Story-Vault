import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { DATABASE_URL,SECRET_KEY } from '../../links'
import { CreateBlogInput, createBlogInput } from "@jayant-issar/storyvault-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
        SECRET_KEY: string
	},
    Variables: {
        userId:string
    }
}>();
blogRouter.use('/*',async (c,next)=>{
    //get the header
    const header = c.req.header("authorization") || "a a a";
    const tokenInHeader = header.split(" ")[1] // extracting the token from the header which is in "Bearer token" format
    //verify the header 
    const tokenResponse = await verify(tokenInHeader,SECRET_KEY)
    //if the header is right we can procide
    if(tokenResponse.id){
        c.set("userId",tokenResponse.id)
        await next()
    }else{
      c.status(403)
      return c.json({
        message: "signup first"
      })
    }
})


blogRouter.post('/',async (c)=>{
    const userId = c.get("userId")
    const body  = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    //@ts-ignore
    const { error } = createBlogInput.safeParse(body);

    if (error) {
    return c.json({
        message: "invalid inputs for creating blog"
    });
    }

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            context: body.context,
            authorId: userId
        }
    })

    return c.json({
        message: "blog created",
        bolgName: body.title,
        id : blog.id
    })
})
  
blogRouter.put('/', async(c)=>{

    const body  = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    //@ts-ignore
    const { error } = createBlogInput.safeParse(body);

    if (error) {
    return c.json({
        message: "invalid inputs for creating blog"
    });
    }

    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            context: body.context
        }
    })

    return c.json({
        message:"the blog has been updated",
        id:blog.id 
    })
})

blogRouter.get('/bulk',async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    const allBlogs = await prisma.post.findMany();

    return c.json({
        allBlogs: allBlogs
    })
})
  
blogRouter.get('/:id',async(c)=>{

    const blogId = c.req.param("id")
    
    const prisma = new PrismaClient({
      datasourceUrl: DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where:{
                //@ts-ignore
                id: blogId
            }
        })
        return c.json({
            blog: blog
        })
    } catch (e) {
        console.log(e);
        c.status(411)
        c.json({
            message: "issue while fetching blog"
        })   
    }
})

//Todo: add pagination

  