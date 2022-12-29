import React from "react";
import "../components/Input.css";
function Input({name,onChange}) {
    return (
        <div className="input_wrap">
            <input type="text"required onChange={onChange}  />
            <span>{name}</span>
            
        </div>
    )
}
export default  Input;