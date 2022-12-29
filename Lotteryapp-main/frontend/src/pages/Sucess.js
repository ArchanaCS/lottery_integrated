import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import tick from "../images/greentick.jpg";
import "../pages/Sucess.css"
export default function Sucess({showsucess,setShowsucess}){
    const navigate= useNavigate();
    console.log("showsuces",showsucess)
    const login=()=>{
        navigate('/Login')
    }

    
    return<>
    <div className="sucess_outer">
    <Topbar image={tick} text={"Success"} click={login}/>
    </div>
    </>
}