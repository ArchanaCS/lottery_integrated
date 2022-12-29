import axios from 'axios';
import { useEffect, useState } from 'react';
import List from './List.js'
export default function Unitsold(){
   
    const [array, setArrayFunc] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/Unitsold'
        const request = {}
        const header = {}

        axios.post(url, request, header)

            .then((response) => {

                if (response.data.length !== 0) {
                    console.log(response.data)
                    setArrayFunc(response.data)
                    

                }
                else {
                    alert("error result record");
                }
            })
            .catch((error) => {
                console.log(error)
            })
        // alert(temp)
    }, [])    // <- add empty brackets here

return(
    <>
    
      
    <List  label1={"Lottery"} label2={"Drawdate"} label3={"Unitsold"} array={array}/>

    </>
)


}