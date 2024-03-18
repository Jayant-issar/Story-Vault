import {BlogCard} from "../components/BlogCard"
import NavBar from "../components/NavBar"
import Skeleton from "../components/Skeleton"
import useBlogs from "../hooks"
export function Blogs() {
    
    const {loading , blogs} = useBlogs()

    if(loading){
        return(
            <div>
                <Skeleton/>
            </div>
        )
    }

  return (
    <div className=" min-h-screen bg-white to-[#FC6736] ">
        <NavBar/>
        <div className=" border-2 border-black p-8 mt-2">
            
            <div>
                <h1 className="text-5xl font-semibold" >
                    All BLogs
                </h1>
            </div>

            <div className=" w-2/3 mt-4">
                {//@ts-ignore 
                blogs.reverse().map(blog => <BlogCard id={blog.id}authorName={blog.author.name} title={blog.title} content={blog.context} publishedDate="Published on March 17, 2024" />
                )
                }
            </div>
            
            
        </div>
    </div>

  )
}

export default Blogs