import { Link,useNavigate } from "react-router-dom"
import axios from "axios"
import { SignInInput } from "@jayant-issar/storyvault-common"
import { useState } from "react"
import { BACKEND_URL } from "../config"

export function Signin() {
    const navigate = useNavigate();
    const[postInputs, setPostInputs] = useState<SignInInput>({
        email: "",
        password:""
    })

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`,postInputs)
            const token = response.data.token
            localStorage.setItem("token",token)
            console.log(response.data);
            if(response.data.message == "user signed in"){
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
      <div className="h-screen bg-gradient-to-r from-[#0C2D57] to-[#FC6736] text-[#EFECEC] flex justify-center items-center">
          <div className="border-2 border-black rounded-2xl w-4/5 h-4/5 flex">
              <div id="signInHeroIamgePart" className="   h-full
               w-1/3 rounded-bl-2xl rounded-tl-2xl">
                <img src="./signinhero.jpeg" alt=""  className="h-full rounded-bl-2xl rounded-tl-2xl w-full"/>
              </div>

              <div id="signindetailsparentdiv" className="  p-4 pb-0 w-2/3 mt-2 ">
                
              <div id="logintext" className="  w-full text-[#EFECEC] flex flex-col items-center justify-center">
                  <h1 className=" text-8xl font-semibold">
                      Sign In
                  </h1>
                  <div className=" flex justify-center mt-2 p-2">
                      <div >
                          Dont have an account? <Link to="/signup" className=" text-[#0C2D57]">SignUp Here</Link>
                      </div>
                  </div>  
              </div>
                <div id="loginForm" className="   mt-4 h-96 p-4">
                    <div id="inputs" className="p-4   flex flex-col items-center justify-center">
                        <input type="text" placeholder="Enter Email" className=" bg-transparent border-2 border-[#FFB0B0] p-6
                        rounded-full focus:outline-none w-4/5 h-16"
                        onChange={(e) => {
                            setPostInputs({
                              ...postInputs,
                              email: e.target.value,
                            });
                            
                        }} />

                        <input type="text" placeholder="Enter Password" className=" mt-4 bg-transparent border-2 border-[#FFB0B0] p-6
                        rounded-full focus:outline-none w-4/5 h-16  "
                        onChange={(e) => {
                            setPostInputs({
                              ...postInputs,
                              password: e.target.value,
                            });
                        
                          }} />
                    </div>
                    
                    <div id="loginbuttonParent" className="p-4  mt-2 flex justify-center ">
                        <button id="loginbutton" className="" 
                        onClick={sendRequest}>
                            Login
                        </button>
                    </div>
                <div className="h-16 mt-9 flex items-end p-1">
                    Devloped by Jayant Issar
                </div>
                </div>
              </div>

              
          </div>
      </div>
    )
  }
  
  export default Signin
  