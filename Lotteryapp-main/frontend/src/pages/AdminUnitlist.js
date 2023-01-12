import HeaderUser from "../components/HeaderUser";
import Filterbar from "../components/Filterbar";
import Unitlist from "../components/Unitlist";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import AdminUserList from "../components/AdminUserList";
import Filterbox from "../components/Filterbox";
import "./AdminUnitlist.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";




function AdminUnitlist() {
    const navigate = useNavigate();
    const uname = localStorage.getItem("usrname");
    const [unitdetails, setUnitdetails] = useState([]);
    const [searchdate, setSearchdate] = useState([]);


  const [userarray, setUserarray] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [username, setUsername] = useState("");
  const [Lotteryname, setLotteryname] = useState("");
  const [purchasedate1, setPurchasedate1] = useState("");
  // const [purchasedate2, setPurchasedate2] = useState("");
  const [drawdate, setDrawdate] = useState("");
  const [selectall, setSelectall] = useState(false);
  const [mainshow, setMainshow] = useState(false);

  useEffect(() => {
    let url = "http://localhost:8080/userlistforadmin";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        console.log("arrayhere", res.data);
        var temp = [...res.data];
        console.log("array", temp);

        for (const item of temp) {
          item.ischecked = false;
        }
        console.log("newarray", temp);
        setUserarray(temp);
        setUserdata(temp);
      })
      .catch();
  }, []);

  //==============handleclickbutton for Filterbox=============//

  const filterhandleclick = () => {
    setMainshow(mainshow ? false : true);
    setUserarray(userdata);
    setLotteryname("");
    setUsername("");
    setDrawdate("");
    setPurchasedate1("");
  };

  //=================Filterbox=======================//

  const handleclickfilter = () => {
    let temp = userarray.filter((item) =>
      item.uname.toLowerCase().includes(username.toLowerCase())
    );
    let sample = userarray.filter((item) =>
      item.txtLotteryname.toLowerCase().includes(Lotteryname.toLowerCase())
    );
    let newsample = userarray.filter(
      (item) =>
        item.uname.toLowerCase().includes(username.toLowerCase()) &&
        item.txtLotteryname.toLowerCase().includes(Lotteryname.toLowerCase())
    );
    let ddate = userarray.filter((item) => item.drawdate === drawdate);
    console.log("dd", ddate);

    let pdate = userarray.filter((item) => item.purchasedate === purchasedate1);
    console.log("pd", pdate);

    console.log("new", newsample);
    console.log("lotteryname", sample);
    console.log("username", temp);
    console.log("myname", username);
    console.log("mylott", Lotteryname);
    console.log("purdate",purchasedate1)
    if (
      temp.length > 0 &&
      sample.length > 0 &&
      pdate.length === 0 &&
      ddate.length === 0
    ) {
      console.log("using1")
      setUserarray(newsample);
    } else if (
      ddate.length > 0 &&
      pdate.length === 0
    ) {
      console.log("using2");
      setUserarray(ddate);
    } else{
      setUserarray(pdate);
    } 
    setMainshow(false);
    console.log(mainshow);
  };

  //=================searchbar===================//

  const setSerach = (value) => {
    let temp = userdata.filter(
      (item) =>
        item.txtLotteryname.toLowerCase().includes(value.toLowerCase()) ||
        item.uname.toLowerCase().includes(value.toLowerCase()) ||
        item.txtaddress.toLowerCase().includes(value.toLowerCase()) ||
        item.purchasedate.includes(value) ||
        item.drawdate.includes(value)
    );

    setUserarray(temp);
    console.log({ value });
    console.log(value);
    console.log("temp", temp);
  };

  //=======================selectall checkbox================//

  const handlechanging = (value) => {
    setSelectall(false);
    console.log("helloooooo", value);
    let temp = [...userarray];
    if (temp[value].ischecked == false) {
      temp[value].ischecked = true;
    } else {
      temp[value].ischecked = false;
    }
    setUserarray(temp);
    console.log("hh", temp[value]);
  };

  const handlechange = () => {
    setSelectall(selectall ? false : true);
    var temp = [...userarray];
    if(selectall===false){
    for (const item of temp) {
      // if (item.ischecked == false) {
      //   item.ischecked = true;
      //   console.log("hello iam");
      // } else {
      //   item.ischecked = false;
      // }
      item.ischecked=true
    }}else{
      for(const item of temp){
        item.ischecked=false;
      }
    }
    setUserarray(temp);
  };

  //================================================================================//

  //   const LogIn = () => {
  //     navigate("/Login");
  //   };
  //   const DeleteFunc = () => {
  //     let url = "http://localhost:8080/unitdelete";
  //     let request = { id: 1 };
  //     let header = {};
  //     axios
  //       .post(url, request, header)
  //       .then((res) => {
  //         console.log("unitlist", res.data);
  //         setUnitdetails(res.data);
  //       })
  //       .catch();
  //   };
  //   const label1click = () => {
  //     navigate("/Userprofile");
  //   };
  //   const label4click = (e) => {
  //     navigate("/");
  //   };
  //   const label5click = () => {
  //     navigate("/AdminDashboard");
  //   };
  //   const label7click = () => {
  //     navigate("/LotteryManager");
  //   };
  //   const label6click = () => {
  //     navigate("/AdminUnit");
  //   };
  //   const label8click = () => {
  //     navigate("/TicketSelector", { state: { id: "", name: "" } });
  //   };
  //   const search_date = (d) => {
  //     console.log(d);
  //     let url = "http://localhost:8080/search_date";
  //     let request = { date: d };
  //     console.log("req", request);
  //     let header = {};
  //     axios
  //       .post(url, request, header)
  //       .then((res) => {
  //         console.log("datesearch", res.data);
  //         setSearchdate(res.data);
  //       })
  //       .catch();
  //   };
const label4click=()=>{
  navigate("/")
}
const label5click=()=>{
  navigate("/AdminDashboard")
}
const label7click=()=>{
  navigate("/LotteryManager")
  
}
const label6click=()=>{
  navigate("/AdminUnit")
}
  return (
    <div className="AdminUnitlist_outer">
      <div className="AdminUnitlist_headerUser">
        {" "}
        <HeaderUser
          label1={uname}
          label2={0}
          label3={"My Cart"}
          label4={"Home"}
          label5={"Dashboard"}
          label6={"Summary"}
          label7={"Lottery Manager"}
          label8={"Buy Now"}
          label4click={label4click}
          label5click={label5click}
          label7click={label7click}
          label6click={label6click}
        />
        
      </div>
      <div className="AdminUnitlist_filterbar">
        <Filterbar
          //   DeleteFunc={DeleteFunc}
          //   search_date={search_date}
          setSerach={setSerach}
          handleclick={filterhandleclick}
          handleselectall={handlechange}
          value={selectall}
        />
      </div>
      <div className="AdminUnitlist_filterbox">
      <Filterbox
        showfilter={mainshow}
        setName={setUsername}
        setLotteryname={setLotteryname}
        setPurchasedate1={setPurchasedate1}
        // setPurchasedate2={setPurchasedate2}
        setDrawdate={setDrawdate}
        handleclickfilter={handleclickfilter}
      />
      </div>
      
      <div className="AdminUnitlist_unitlist">
        <div className="AdminUnitlist_unitlist_item">
          <AdminUserList data={userarray} handlechange={handlechanging} />
        </div>
      </div>
      <div className="AdminUnitlist_footer">
        <Footer />

      </div>
    </div>
  );
}
export default AdminUnitlist;