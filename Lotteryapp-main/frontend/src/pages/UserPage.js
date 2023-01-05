import "./UserPage.css";

import HeaderUser from "../components/HeaderUser";
import LotteryUnits from "../components/LotteryUnits";
import Option from "../components/Option";
import Footer from "../components/Footer";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import Collapsible from "react-collapsible";
import { GrAddCircle } from "react-icons/gr";
import { useState } from "react";
function UserPage() {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
 
  const usrname=localStorage.getItem('usrname')
  const mycart = () => {
    navigate("/Login");
  };
  const buynow = () => {
    navigate("/TicketSelector");
  };
  const profile = () => {
    navigate("/Userprofile");
  };
  const label5click=()=>{
    navigate("/UserPage")
  }
  const label7click=()=>{
    // navigate("/LotteryManager")
    
  }
  const label6click=()=>{
    navigate("/Userprofile")
  }
  const label8click=()=>{
    navigate("/TicketSelector", { state: { id: "", name: "" } })
  }
  const label4click=()=>{
    navigate("/")
  }

  return (
    <div className="userpage_outer">
      <div className="userpage_headerUser">
        {" "}
        <HeaderUser
          label1={usrname}
          label2={0}
          label3={"My Cart"}
          label4={"Home"}
          label5={"Dashboard"}
          label6={"Profile"}
          label7={"About Us"}
          label8={"Buy Now"}
          label4click={label4click}
          label5click={label5click}
          label7click={label7click}
          label6click={label6click}
          label8click={label8click}
        />
      </div>
      <div className="userpage_col1">
      <div className="userpage_lottunits">
        <Timer />
        </div>

      <div className="userpage_col_tab">
        <Collapsible
          trigger={
            <div className="userpage_col_tab_icon">
              <GrAddCircle />
              <label>Lottery info</label>
            </div>
          }
        >
          <List array={array} />
        </Collapsible>
      </div>
      </div>
      <div className="userpage_list">
        {/* <List label1={"Lotteryname"} label2={"Numbers"} label3={"status"} /> */}
      </div>
      {/* <div className="userpage_option">
        {" "}
        <Option />
      </div> */}
      <div className="userpage_footer">
        {" "}
        <Footer />
      </div>
    </div>
  );
}

export default UserPage;
