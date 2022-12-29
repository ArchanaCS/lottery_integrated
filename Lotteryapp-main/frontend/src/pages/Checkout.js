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
export default function Checkout({ linenum }) {
  const linearray = useSelector((state) => state.linearray);
  const navigate=useNavigate();
  const usrname=localStorage.getItem("usrname")
  console.log("usrname",usrname)
  const location = useLocation();
  const userid=localStorage.getItem("userid")
  const chkout = () => {

    let url = "http://localhost:8080/insertunit";
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
        let request = { uid :userid,lid: location.state.lid, arr: valu[i] };
       console.log(request)
        axios
          .post(url, request, header)
          .then((res) => {
            console.log(res.data);
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
        <div>{location.state.lid}</div>
        <div className="Checkout_cartheader">
          <CartHeader />
        </div>
        <div className="Checkout_cartitems">
          <Cartitems label1={location.state.lname}/>
        </div>
        <div className="Checkout_total">
          <CheckoutTotal />
        </div>
        <div className="Checkout_click" onClick={chkout}>
          <Checkoutclick chkout={chkout} />
        </div>

        <Footer />
      </div>
    </>
  );
}
