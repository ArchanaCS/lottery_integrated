import "./AdminDashboard.css";
import HeaderUser from "../components/HeaderUser";
import Filterbar from "../components/Filterbar";

import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Result from "../components/Drawresult";
import AddLottery from "../components/AddLottery";
import AddLotterycalc from "../components/AddLotterycalc";
import AddLotterycom from "../components/AddLotterycom";
import Checkoutbutton from "../components/Checkoutbutton";
import Unitsold from "../components/List";
import Winners from "../components/Winners";
import Unitpending from "../components/Unitpending";
import { BsCloudMoonFill } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";
function Dashboard() {
  const navigate = useNavigate();

  const [unitdetails, setUnitdetails] = useState([]);
  const [unitsold, setUnitsold] = useState([]);
  const [unitpending, setUnitpending] = useState([]);
  const [lotteryresult, setLotteryresult] = useState([]);
  const [latestlotteryresult, setLatestLotteryresult] = useState([]);
  const [winner, setWinner] = useState("");
  const usrname=localStorage.getItem("usrname")
  console.log("usrname",usrname)
  useEffect(() => {
  

    let url_unitsold = "http://localhost:8080/Unitsold";
    let request_unitsold = {};
    let header_unitsold = {};

    let url_unitpending = "http://localhost:8080/Unitpending";
    let request_unitpending = {};
    let header_unitpending = {};

    let url_winners = "http://localhost:8080/winners";
    let request_winners = {};
    let header_winners = {};

    let url_drawlist = "http://localhost:8080/lotterydrawresult";
    let req_drawlist = {};
    let header_drawlist = {};

    let url_drawresult = "http://localhost:8080/latestlotterydrawresult";
    let req_drawresult = {};
    let header_drawresult = {};

    axios
      .post(url_unitsold, request_unitsold, header_unitsold)
      .then((res) => {
        console.log("unitsold", res.data);
        setUnitsold(res.data);
      })
      .catch();
    axios
      .post(url_unitpending, request_unitpending, header_unitpending)
      .then((res) => {
        console.log("unitpending", res.data);
        setUnitpending(res.data);
      })
      .catch();

    axios
      .post(url_winners, request_winners, header_winners)
      .then((res) => {
        setWinner(res.data.winners);
        console.log("winner"+res.data);
      })
      .catch();
    axios
      .post(url_drawlist, req_drawlist, header_drawlist)
      .then((res) => {
        // console.log("hiadminlottery");
        console.log(res.data);
        setLotteryresult(res.data);
        console.log("lotteryresult", res.data);
      })
      .catch();
    axios
      .post(url_drawresult, req_drawresult, header_drawresult)
      .then((res) => {
        // console.log("hiadmnlottery");
        setLatestLotteryresult(res.data);
        console.log("latestlotteryresult", res.data);
      })
      .catch();
  }, []);

  const LogIn = () => {
    navigate("/Login");
  };
  const handleLotteryAdd = () => {};
  const label4click=()=>{
    navigate("/AdminDashboard")
  }
  const label5click=()=>{
    navigate("/AdminUnit")
  }
  const label7click=()=>{
    navigate("/TicketSelector")
  }
  const label6click=()=>{
    navigate("/LotteryManager")
  }
  return (
    <div className="AdminDashboard_outer">
      <div className="AdminDashboard_headerUser">
        {" "}
        <HeaderUser
          label1={usrname}
          label2={0}
          label3={"My Cart"}
          label4={"Dashboard"}
          label5={"Summary"}
          label6={"Lottery Manager"}
          label7={"Buy Now"}
          label4click={label4click}
          label5click={label5click}
          label7click={label7click}
          label6click={label6click}
        />
      </div>
      <div className="AdminDashboard_row">
        <Result array1={lotteryresult} array2={latestlotteryresult} />
      </div>
      <div className="AdminDashboard_row">
        <div className="AdminDashboard_tables">
          <div className="AdminDashboard_row_col">
            <Unitsold
              label1={"Lottery"}
              label2={"Drawdate"}
              label3={"Units Sold"}
              array={unitsold}
            />
          </div>
          <div className="AdminDashboard_row_col">
            <Unitpending
              label1={"Lottery"}
              label2={"Units Confirmed"}
              label3={"Units Pending"}
              array={unitpending}
            />
          </div>
        </div>
        
      </div>
      <div className="AdminDashboard_row">
        <Winners value1={winner} />
      </div>

      {/* <div className="AdminDashboard_lottery">
        <div className="AdminDashboard_lottery_btn">
          <Checkoutbutton value2={"Add Lottery"} />
        </div>
        <AddLottery />
        <AddLotterycom />
        <AddLotterycalc />
      </div> */}

      <div className="AdminDashboard_footer">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
