import Header from "../components/HeaderUser";
import "./Checkout.css";
import Footer from "../components/Footer";
import CartHeader from "../components/Cartheader";
import Cartitems from "../components/Cartitems";
import Checkoutclick from "../components/Checkoutcomponent";
import CheckoutTotal from "../components/Checkouttotal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { GiConsoleController } from "react-icons/gi";
export default function Checkout({ linenum }) {
  const linearray = useSelector((state) => state.linearray);
  const navigate=useNavigate();
  const usrname=localStorage.getItem("usrname")
  console.log("usrname",usrname)
  const location = useLocation();
  const dispatch = useDispatch();
  const [array,setArray]=useState([])
  const userid=localStorage.getItem("userid")
  useEffect(()=>{
    
    console.log(location.state.subltryid)
    let url="http://localhost:8000/purchasedloryfetch";
    let request={};
    let header={};
    axios.post(url,request,header).then((res)=>{
      console.log("Array chkout",res.data)
      setArray(res.data)
    }).catch()
  },[])
  const chkout = () => {

    let url = "http://localhost:8000/insertunit";
    let header = {};

    const valu = [];
    const temp = [...linearray];
    for (const itrt of temp) {
      let temp = [];
      for (const t of itrt) {
        if (t.isselected) temp.push(t.value);
      }
      valu.push(temp);
     
    }
    for (var i = 0; i < valu.length; i++) {
      if(valu[i]!="")
      {
        let request = { uid :2,lid: 3, arr: valu[i] };
       console.log(request)
        axios
          .post(url, request, header)
          .then((res) => {
            console.log(res.data);
           if(res.data!="Error")
           {
            dispatch({ type: "setLineArray", payload: [] });
            
          
           }
          })
          .catch();

      }
      else if(usrname=="")
      {
        navigate("/Login")
      }
     
    }
  };
  //  console.log(valu)

  //  console.log(request)
  //  axios.post(url,request,header).then((res)=>{
  //   console.log(res.data)
  //  }).catch()

  return (
    <>
      <div className="Checkout_Main">
        <div className="Checkout_header">
          <Header />
        </div>
       
        <div className="Checkout_cartheader">
          <CartHeader />
        </div>
        <div className="Checkout_cartitems">
          <Cartitems label1={location.state.lname} array={array}/>
        </div>
        {/* <div className="Checkout_total">
          <CheckoutTotal />
        </div> */}
        <div className="Checkout_click" onClick={chkout}>
          <Checkoutclick chkout={chkout} />
        </div>

        <Footer />
      </div>
    </>
  );
}
