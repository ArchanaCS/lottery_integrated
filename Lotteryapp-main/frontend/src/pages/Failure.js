import Topbar from "../components/Topbar";
import redcross from "../images/redcross.jpg";
import "../pages/Failure.css"
export default function Failure({showfailure,setShowfailure}){
    const fail=()=>{
        setShowfailure(false)
    }
    return<>
    <div className="failure_outer">
    <Topbar image={redcross} text={"Failure"} click={fail}/>
    </div>
  
    </>
}