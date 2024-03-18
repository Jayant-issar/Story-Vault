import axios from "axios";
import { Avatar } from "../components/BlogCard"
import NavBar from "../components/NavBar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


interface AuthorInformation {
  "id": string,
  "title": string,
  "context": string,
  "published": boolean,
  "authorId": string,
  "author": {
      "id": string,
      "email": string,
      "name": string,
      "password": string
  }
}

export function Blog() {
  const searchParam = useParams()
  const[loading,setLoading] = useState(true)
  const[authorInformation,setAuthorInformation] = useState<AuthorInformation>({
    "id": "Searching",
    "title": "Searching",
    "context": "Searching",
    "published": false,
    "authorId": "Searching",
    "author": {
        "id": "Searching",
        "email": "Searching",
        "name": "Searching",
        "password": "Searching"
    }
  })
  useEffect(()=>{
    axios.get(`${BACKEND_URL}/blog/${searchParam.id}`,{
      headers: {
        authorization: "Bearer" + " " + localStorage.getItem('token')
      },
      params:{
        id:searchParam.id
      }
    }).then((response)=>{
      setAuthorInformation(response.data.blog)
      console.log(response.data.blog);
      setLoading(false)
      
    })
  },[])
  
  if(loading){
    return <div className="h-screen flex justify-center items-center">
          <div
        className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
      >
        <div
          className="rounded-full h-full w-full bg-slate-100 background-blur-md"
        ></div>
      </div>

    </div>
  }

  return (
    <div className=" min-h-screen">
        <div>
          <NavBar/>
        </div>
        <div id="maincontent" className=" p-4 mt-4 flex  rounded-xl">
            <div className=" p-4 border-2 border-black rounded-xl w-4/5">
              <h1 className=" text-6xl font-semibold ">
                {authorInformation.title}
              </h1>
              <div className=" my-3">
                <Avatar name={authorInformation.author.name} />·     Pblished on 18/02/2024
              </div>
              <div id="contentOFmainblog">
                 {authorInformation.context}
              </div>
            </div>
            <div className=" p-4 border-2 ml-2 border-black rounded-xl w-1/5 h-52 bg-[#0C2D57] text-[#EFECEC]">
              <h1 className=" text-3xl font-semibold m-1 ">Author</h1>
              <div className=" flex">
                <Avatar name={authorInformation.author.name} />
                <div className="">
                    <span className=" flex items-center bg-[#FFB0B0] rounded-full px-3 py-1 text-xs font-semibold text-[#0C2D57] mr-1 h-full">{authorInformation.author.name}</span>
                </div>
              </div>
              <div className="mt-5">
                A very random catch pharse about the author,
              </div>
            </div>

        </div>
    </div>
  )
}

export default Blog