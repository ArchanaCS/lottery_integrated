import "./AdminUnitlist.css";
import HeaderUser from "../components/HeaderUser";
import Filterbar from "../components/Filterbar";
import Unitlist from "../components/Unitlist";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import usestate from "usestate";
import AdminUserList from "../components/AdminUserList";
import Filterbox from "../components/Filterbox";
function AdminUnitlist() {
  const navigate = useNavigate();
  const uname=localStorage.getItem('usrname')
  const [unitdetails, setUnitdetails] = useState([]);
  const [filtersearch,setFilterSerach]=useState("");
  const[searchdate,setSearchdate]=useState([]);
  const [userarray, setUserarray] = useState([]);
  
  const [username, setUsername] = useState("");
  const [Lotteryname, setLotteryname] = useState("");
  const [purchasedate1, setPurchasedate1] = useState("");
  const [purchasedate2, setPurchasedate2] = useState("");
  const [drawdate, setDrawdate] = useState("");

  const [mainshow, setMainshow] = useState(false);
 
  const handleclick = () => {
    setMainshow(mainshow ? false : true);
  };
  useEffect(() => {
    let url = "http://localhost:8080/userlistforadmin";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        setUserarray(res.data);
      })
      .catch();
  }, []);
  const handleclickfilter = (e) => {
    var temp = [...userarray];
    setUserarray(
      temp.filter(
        (item) =>
          item.txtLotteryname.toLowerCase().includes(Lotteryname.toLowerCase()) || item.txtFname.toLowerCase().includes(username.toLowerCase())));
    setMainshow(false);
  };
  var usertemparray = [...userarray];
  usertemparray = userarray.filter(
    (item) =>
      item.txtLotteryname.toLowerCase().includes(filtersearch.toLowerCase()) ||
      item.txtFname.toLowerCase().includes(filtersearch.toLowerCase()) ||
      item.purchasedate.includes(filtersearch) ||
      item.lotterydrawdate.includes(filtersearch)
  );
  const handlechange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      let tempuser = userarray.map((item) => {
        return { ...item, ischecked: checked };
      });
      setUserarray(tempuser);
    } else {
      let tempuser = userarray.map((item) =>
        item.txtFname === name ? { ...item, ischecked: checked } : item
      );
      setUserarray(tempuser);
    }
  };
  console.log("pp", usertemparray);
  const LogIn = () => {
    navigate("/Login");
  };

  const DeleteFunc=()=>
  {
    let url = "http://localhost:8080/unitdelete";
    let request = {id:1};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log("unitlist", res.data);
        setUnitdetails(res.data);
      })
      .catch();
  }
  const label1click=()=>{
    navigate("/Userprofile")

  }
const search_date=(d)=>{

  console.log(d)
  let url = "http://localhost:8080/search_date";
    let request = {date:d};
    console.log("req", request);
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log("datesearch", res.data);
        setSearchdate(res.data)
      })
      .catch();
}
  return (
    <div className="AdminUnitlist_outer">
      <div className="AdminUnitlist_headerUser">
        {" "}
        <HeaderUser
          label1={uname}
          label2={0}
          label3={"My Cart"}
          label4={"Dashboard"}
          label5={"Summary"}
          label6={"Lottery Manager"}
          label7={"Buy Now"}
          Loginclick={LogIn}
          label1click={label1click}
        />
      </div>
      <div className="AdminUnitlist_filterbar">
        <Filterbar DeleteFunc={DeleteFunc} search_date={search_date} setFilterSerach={setFilterSerach} handleclick={handleclick}/>
      
      </div>
        <Filterbox showfilter={mainshow}
          setName={setUsername}
          setLotteryname={setLotteryname}
          setPurchasedate1={setPurchasedate1}
          setPurchasedate2={setPurchasedate2}
          setDrawdate={setDrawdate}
          handleclickfilter={handleclickfilter}/>
      <div className="AdminUnitlist_unitlist">
        <AdminUserList  data={usertemparray} handlechange={handlechange}/>
      </div>

      <div className="AdminUnitlist_footer">
        <Footer />
      </div>
    </div>
  );
}

export default AdminUnitlist;
