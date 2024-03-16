import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();

app.post('/api/v1/singnup',async (c)=>{ //  c here stands for context, hono gives us a single object
  const body  = await c.req.json() // way to get body in hono
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  const author = await prisma.user.create({
    data:{
      name: body.name,
      email:body.email,
      password: body.password 
    }
  })
  return c.text('this is a signup route')
})

app.post('/api/v1//singnin',(c)=>{
  return c.text('this is a signin route')
})

app.post('/api/v1//blog',(c)=>{
  return c.text('this allows yout to post a blog')
})

app.put('/api/v1//blog',(c)=>{
  return c.text('this allows yout to post a blog')
})

app.get('/api/v1/blog:id',(c)=>{
  return c.text('this allows yout to post a blog')
})

export default app
