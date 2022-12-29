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
  var uname = localStorage.getItem("usrname");
  const mycart = () => {
    navigate("/Login");
  };
  const buynow = () => {
    navigate("/TicketSelector");
  };
  const profile = () => {
    navigate("/Userprofile");
  };
  const label6click = () => {
    navigate("/Userprofile");
  };
  const label7click = () => {
    navigate("/TicketSelector");
  };

  return (
    <div className="userpage_outer">
      <div className="userpage_headerUser">
        {" "}
        <HeaderUser
          label1={uname}
          label2={0}
          label3={"My Cart"}
          label4={""}
          label5={"Dashboard"}
          label6={"Profile"}
          label7={"Buy Now"}
          Loginclick={buynow}
          cartclick={mycart}
          headerclick={profile}
          buynowclick={""}
          label6click={label6click}
          label7click={label7click}
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
