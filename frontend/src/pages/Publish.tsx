import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import NavBar from "../components/NavBar"

interface publishinput {
    title:string,
    content:string
}
function Publish() {
    const [publishInput,setPublishInput] = useState<publishinput>({
        title : "",content:""
    })

    const navigate = useNavigate() 
  return (
    <div className="container mx-auto pb-12">
        <NavBar/>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg mt-7 border-2 border-black shadow-md">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">Share Your Story</h1>
            <form action="#" method="POST" className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-3xl font-medium text-gray-700">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter your Story title"
                    onChange={(e)=>{
                        setPublishInput({
                            ...publishInput,
                            title:e.target.value
                        })
                    }}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 focus:outline-none p-4 rounded-md"/>
                </div>
                <div>
                    <label htmlFor="content" className="block text-2xl font-medium text-gray-700">Content</label>
                    <textarea id="content" name="content" rows={6} 
                        className="mt-1 focus:outline-none p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                        placeholder="Write your Story content here..."
                        onChange={(e)=>{
                            setPublishInput({
                                ...publishInput,
                                content:e.target.value
                            })
                            console.log(publishInput);
                            
                        }}></textarea>
                </div>
                <div>
                    <button 
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FC6736] hover:bg-[#FFB0B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>{
                            navigate('/blogs')
                            sendRequest(publishInput)
                        }}>
                        Share
                    </button>
                    <button 
                        className="w-full mt-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FC6736] hover:bg-[#FFB0B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={()=>{
                            navigate('/blogs')
                        }}>
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

function  sendRequest({title,content}:{title:string,content:string}){
    axios.post(`${BACKEND_URL}/blog`,{
        title:title,
        context:content,
        
    },{
        headers:{
            authorization: "Bearer" + " " + localStorage.getItem('token')
        }
    })
    
}

export default Publish