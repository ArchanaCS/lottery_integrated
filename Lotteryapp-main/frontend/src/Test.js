import { useState } from "react";
import './Test.css'
const Test = () => {
    const [linearray, setLineArray] = useState([[{ value: 1, isSelected: false }, { value: 2, isSelected: true }, { value: 3, isSelected: true }], [{ value: 4, isSelected: false }, { value: 5, isSelected: true }], [{ value: 1, isSelected: true }, { value: 2, isSelected: true }]])
    const handleClick=(e, itm, citm, indx, cindx)=>{
        let temp=[...linearray]
        temp[indx][cindx].isSelected=!temp[indx][cindx].isSelected;
        for (const iterator of temp[indx]) {
            iterator.value=iterator.value+1;
        }
        setLineArray(temp)
    }
    const handleSubmit=()=>{
        let string="";
        for (const iterator of linearray) {
            for (const obj of iterator) {
                if(!obj.isSelected)
                    string+=obj.value+", "
            }
        }
        alert(string)
    }
    return <>
        {linearray.map((itm, indx) => {
            return <>
            <div className="maindiv">{itm.map((citm, cindx)=>{
                return <><h1 onClick={(e)=>{handleClick(e, itm, citm, indx, cindx)}} className={citm.isSelected?"red":"black"}>{JSON.stringify(citm.value)}</h1></>
            })}</div><br/>
            </>
        })}
        <button onClick={e=>handleSubmit()}>Click me</button>
    </>
}
const Test2 = () => {
    const [linearray, setLineArray] = useState([[{ value: 1, isSelected: true }, { value: 2, isSelected: true }, { value: 3, isSelected: true }], [{ value: 4, isSelected: true }, { value: 5, isSelected: true }], [{ value: 1, isSelected: true }, { value: 2, isSelected: true }]])
    return <>
        {linearray.map((itm, indx) => {
            return <><label>{JSON.stringify(itm)}</label><br /></>
        })}
    </>
}
export default Test;