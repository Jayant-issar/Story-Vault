import { Link,useNavigate } from "react-router-dom"
import { SignupInput } from "@jayant-issar/storyvault-common"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"
export function Signup() {
  const navigate = useNavigate()
  const[  postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password:""
  })

  async function sendRequest(){
    try {
        console.log(postInputs);
      
        const response = await axios.post(`${BACKEND_URL}/user/signup`,postInputs)
        const token = response.data.token
        localStorage.setItem("token",token)
        console.log(response.data);
        if(response.data.message == "user created"){
            navigate('/blogs')
        }else{
            alert("Wrong email or password")
        }
    } catch (error) {
        console.log("error while connecting to the backend");
        console.log(error);  
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-[#0C2D57]  to-[#FC6736] text-[#EFECEC] flex justify-center items-center">
        <div className="border-2 border-black rounded-2xl w-4/5 h-4/5 flex">
            <div id="signInHeroIamgePart" className="h-full
             w-1/3 rounded-bl-2xl rounded-tl-2xl">
              <img src="./signupHero.jpeg" alt=""  className="h-full rounded-bl-2xl rounded-tl-2xl w-full"/>
            </div>

            <div id="signindetailsparentdiv" className="  p-4 w-2/3 mt-2 ">
              
              <div id="logintext" className="  w-full text-[#EFECEC] flex flex-col items-center justify-center">
                  <h1 className=" text-8xl font-semibold">
                      Sign Up
                  </h1>
                  <div className=" flex justify-center mt-2 p-2">
                      <div >
                          Already have an acoount? <Link to="/signin" className=" text-[#0C2D57]">SignIn Here</Link>
                      </div>
                  </div>  
              </div>
              <div id="loginForm" className="   mt-2 h-96 p-4">
                  <div id="inputs" className="p-4   flex flex-col items-center justify-center">
                      <input type="text" placeholder="Enter Email" className=" bg-transparent border-2 border-[#FFB0B0] p-6
                      rounded-full focus:outline-none w-4/5 h-16 " 
                      onChange={(e) => {
                        setPostInputs({
                          ...postInputs,
                          email: e.target.value,
                        });
                        
                      }} />

                      <input type="text" placeholder="Enter Full Name" className=" mt-4
                       bg-transparent border-2 border-[#FFB0B0] p-6
                      rounded-full focus:outline-none w-4/5 h-16"
                      onChange={(e) => {
                        setPostInputs({
                          ...postInputs,
                          name: e.target.value,
                        });
                        
                      }} />


                      <input type="text" placeholder="Enter Password" className=" mt-4 bg-transparent border-2 border-[#FFB0B0] p-6
                      rounded-full focus:outline-none w-4/5 h-16"
                      onChange={(e) => {
                        setPostInputs({
                          ...postInputs,
                          password: e.target.value,
                        });
                        console.log(postInputs.password);
                        
                        
                      }} />
                  </div>
                  
                  <div id="loginbuttonParent" className="p-4  mt-1 flex justify-center ">
                      <button id="loginbutton" className="" onClick={sendRequest}>
                          Sign Up
                      </button>
                  </div>

                  
              </div>
              <div className="">
                  Devloped by Jayant Issar
              </div>
              
            </div>

            
        </div>
    </div>
  )
}

export default Signup