import { useNavigate } from "react-router-dom"
import "../style.css"

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div className=" h-screen bg-image flex justify-center items-center " >
        <div className=" text-white bg-black bg-opacity-45 h-full w-full flex justify-center items-center">
            <div className=" w-3/5 mb-10" >
                <div className=" text-yellow-200 font-semibold font-mono flex justify-center text-opacity-60 m-6">
                    DEVELOPED BY JAYANT ISSAR
                </div>
                <div className=" font-thin font-mono flex justify-center text-opacity-40 text-9xl m-5">
                    STORY VAULT
                </div>
                <div className=" text-center w-4/5 text-lg">
                    For those whose voices whisper in the quiet of their hearts, for the ones who find solace in words unspoken, welcome to Story Vault - where silence finds its eloquence.
                </div>

                <div className=" flex justify-center">
                    <button onClick={()=>{
                        navigate('/signin')
                    }}
                     className=" bg-transparent border-2 flex items-center  justify-center border-yellow-300 p-4 rounded-full w-52 mt-5 text-2xl" >
                        Sign In <div className=" text-3xl">→</div>
                    </button>
                </div>
                <div className=" flex justify-center p-5">
                    <div className="flex bg-yellow-200 bg-opacity-30 rounded-xl">
                        <a href="https://www.linkedin.com/in/jayant-issar-b12355292/">
                            <div className="flex h-8 w-8 m-4 hover:cursor-pointer ">
                                <img src="./linkedin.svg" alt="" />
                            </div>
                        </a>

                        <a href="https://github.com/Jayant-issar">
                            <div className="flex h-8 w-8 m-4 hover:cursor-pointer ">
                                <img src="./github.svg" alt="" />
                            </div>
                        </a>
                        <a href="mailto:jayantissar23@gmail.com">
                            <div className="flex h-8 w-8 m-4 hover:cursor-pointer ">
                                <img src="./mail.svg" alt="" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage