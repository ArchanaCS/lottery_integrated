import "./HeaderUser.css";
import lottery_icons from "../images/drum.jpg";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {BiUserCircle}  from "react-icons/bi"
// import user_logo from '../image/user_logo.png';
export default function Header({label1,label2,label3,label4,label5,Loginclick,cartclick,headerclick,buynowclick,uname}) {
  // const navigate = useNavigate();
  // const login = () => {
  //   navigate("/Login");
  // };
  const logout=()=>{
    localStorage.removeItem("uname");
    // setIsLoggedin(false);
  }
  return (
    <>
      <div className="headerUser_outer">
        <div className="headerUser_icon">
          <div className="headerUser_icon_left">
            <img src={lottery_icons} />
          </div>
          <div className="headerUser_icon_right">
            <label className="bold">Lottery drums</label>

            <label className="small"> From Devfactory</label>
          </div>
        </div>

        <div className="headerUser_menu">
          <div className="headerUser_menu_col">
            <label onClick={buynowclick}>{label1}</label>
          </div>
          <div className="headerUser_menu_col">
            
            <label onClick={Loginclick}>{label2}</label>
          </div>
          <div className="headerUser_menu_col">
            <label onClick={headerclick}>{label3}</label>
          </div>{" "}
        </div>
        <div></div>
        <div className="headerUser_cart">
          <div className="headerUser_cart_colleft" >
            <FaOpencart size="2rem" />
          </div>
          <div className="headerUser_cart_colright">
            <label onClick={cartclick}>{label4}</label>
            <label>{label5}</label>
          </div>
          <div className="dropdown">
          <div className="headerUser_user">
          <BiUserCircle size="2rem"/>
          <label>{uname}</label>
          </div>
        <div className="dropdown-content">
          <label onClick={logout}>Logout</label>
        </div>
      </div>
        </div>
      </div>
    </>
  );
}
