import "../pages/Userprofile.css";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import List from "../components/List";
import Useredit from "../components/UserProfileedit";
import Collapsible from "react-collapsible";
import { GrAddCircle } from "react-icons/gr";
import Bankedits from "../components/Bankedit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Userprofile() {
  const [array, setArray] = useState([]);
  const uname=localStorage.getItem('usrname')
  const navigate = useNavigate();
  const mycart = () => {
    navigate("/Login");
  };
  const buynow = () => {
    navigate("/TicketSelector");
  };
  const profile = () => {
    navigate("/Userprofile");
  };
  return (
    <div className="userprofile_container">
      <div className="userprofile_header">
        <HeaderUser
          label1={uname}
          label2={0}
          label3={"MyCart"}
          label4={""}
          label5={"Dashboard"}
          label6={"Profile"}
          label7={"Buy Now"}
          label7click={buynow}
          cartclick={mycart}
          headerclick={profile}
          buynowclick={""}
          uname={""}
        />
      </div>

      {/* <div className="userprofile_col_tab">
        <Collapsible
          trigger={
            <div className="userprofile_col_tab_icon">
              <GrAddCircle />
              <label>Lottery info</label>
            </div>
          }
        >
          <List  />
        </Collapsible>
      </div> */}

      <div className="userprofile_col_tab">
        <Collapsible
          trigger={
            <div className="userprofile_col_tab_icon">
              <GrAddCircle />
              <label>Personal info</label>
            </div>
          }
        >
          <Useredit />
        </Collapsible>
      </div>

      <div className="userprofile_col_tab">
        <Collapsible
          trigger={
            <div className="userprofile_col_tab_icon">
              <GrAddCircle />
              <label>Bank info</label>
            </div>
          }
        >
          <div className="userprofile_col_tab_content3">
            <Bankedits />
          </div>
        </Collapsible>
      </div>

      <div className="userprofile_footer">
        <Footer />
      </div>
    </div>
  );
}
