import { useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"


export function NavBar() {
  const navigate = useNavigate()
  return (
    <div className="h-16 bg-[#0C2D57]  p-2 flex justify-between items-center">
        <div className=" text-4xl text-[#FFB0B0] font-semibold">
            Story-Vault
        </div>

        <div className=" text-[#EFECEC] flex text-xl">
            
            <button className=" bg-[#FF8080] w-20 rounded-xl flex items-center justify-center mr-2 text-[#0C2D57] font-semibold"
            onClick={()=>{
              navigate('/publish')
            }}>
              Publish
            </button>

            <Avatar name="User" /> Hey, User
        </div>
    </div>
  )
}

export default NavBar