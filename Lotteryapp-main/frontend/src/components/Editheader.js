import "./Editheader.css";
import { useState } from "react";
export default function Editheader(){
    const[key1,setKey1]=useState(false);
    const[key2,setKey2]=useState(false);
    const[key3,setKey3]=useState(false);
    const profilebutton=()=>{
        setKey1(key1?false:true)
        setKey2(false)
        setKey3(false)
    }
    const passwordbutton=()=>{
        setKey2(key2?false:true)
        setKey3(false)
        setKey1(false)
    }
    const bankbutton=()=>{
        setKey3(key3?false:true)
        setKey2(false)
        setKey1(false)
    }
    return(
        <div className="Editheader">
            <div className="Editheader_raw">
                <div className="Editheader_raw_btn"><button  onClick={(e) =>profilebutton()} className={key1? "button clicked" : "button"}>Profile</button></div>
                <div className="Editheader_raw_btn"><button  onClick={(e) =>passwordbutton()} className={key2? "button clicked" : "button"}>Password</button></div>
                <div className="Editheader_raw_btn"><button  onClick={(e) =>bankbutton()} className={key3? "button clicked" : "button"}>Bank</button></div>
            </div>
        </div>
    );
}