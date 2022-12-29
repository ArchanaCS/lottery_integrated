import "./HomePage.css";

import HeaderUser from "../components/HeaderUser";
// import HeaderLogout from './components/HeaderOut';
// import Betterwin from './components/Betterwin';
import Sliderswipe from "../components/Sliderswipe";
import Menu from "../components/Menu";
import LotteryUnits from "../components/LotteryUnits";
import Animation from "../components/Animation";
import Option from "../components/Option";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Timer from "../components/Timer";
import { Link } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [lotteryname, setLotteryname] = useState("");
  const [date, setDate] = useState("");
  const [prize, setPrize] = useState("");
  const [lotteryid, setLotteryid] = useState("");
  const [count, setCount] = useState("");
  var uname = localStorage.getItem("uname");
  const userid=localStorage.getItem("userid")
  console.log(userid)
  useEffect(() => {
    let url = "http://localhost:8080/drawticket";
    let request = {};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        setDate(res.data[0].drawdate);
        setLotteryname(res.data[0].txtLotteryname);
        setPrize(res.data[0].txtLotteryprize);
        setLotteryid(res.data[0].id);
        // setLotterdetails(res.data);
      })
      .catch();


      let url_cart="http://localhost:8080/header_countunit"
      let header_cart={};
      let request_cart={id:userid};
      axios.post(url_cart,request_cart,header_cart).then((res)=>{
        console.log(res.data[0].count)
        if(userid=""){
          setCount(0)
        }
        else
        {
          setCount(res.data[0].count)
        }
        
      }).catch()

  }, []);

  const buynowclick = (e) => {
   
  };
  const registerclick = (e) => {};
  const loginclick = (e) => {
    navigate("/TicketSelector", { state: { id: "", name: "" } });
  };
  const label7click = () => {
    navigate("/Login");
  };
  const label8click = () => {
    navigate("/Signup");
  };
  const ticketPurchase = () => {
    navigate("/TicketSelector", {
      state: { id: lotteryid, name: lotteryname },
    });
    // navigate("/TicketSelector")
  };
  return (
    <div className="lottery_outer">
      <div className="lottery_headerUser">
        <HeaderUser
      
          label1={"Guest"}
          label2={count}
          label3={"Cart"}
          label4={"Home"}
          label5={"Learn"}
          label6={"Buy Now"}
          label7={"Login"}
          label8={"Register"}
          label1click={""}
          label4click={buynowclick}
          label5click={registerclick}
          label6click={loginclick}
          label7click={label7click}
          label8click={label8click}
        />
      </div>
      {count}
      <div className="lottery_sliderswipe">
        <Sliderswipe />
      </div>
      <div className="lottery_lottunits">
        <Timer
          details={lotteryname}
          deadline={date}
          prize={prize}
          ticketPurchase={ticketPurchase}
          lotteryid={lotteryid}
        />
      </div>
      {/* <div className='lottery_lottunits'><LotteryUnits details={lotteryname} date={date}/></div> */}
      <div className="lottery_animation">
        <Animation />
      </div>
      <div className="lottery_option">
     
        <Option />
      </div>
      <div className="lottery_footer">
       
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
