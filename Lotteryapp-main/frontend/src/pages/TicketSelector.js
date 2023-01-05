import HeaderUser from "../components/HeaderUser";
import Drawinformation from "../components/Drawresult";
import Lineselector from "../components/Lineselector";
import Linemessage from "../components/Linemessage";
import Footer from "../components/Footer";
import { useState, useMemo, useEffect } from "react";
import "./TicketSelector.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Checkoutbutton from "../components/Checkoutbutton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { MdLocationCity } from "react-icons/md";
import { GiConsoleController } from "react-icons/gi";
import { CgDetailsLess } from "react-icons/cg";
export default function TicketSelector() {
  const [value, setValue] = useState([]);
  const [err, setErrmsg] = useState("");
  const [ltryname, setLtryname] = useState("");
  const [lotterylist, setLotterylist] = useState([]);
  const [ltryid, setltryid] = useState({ ltrid: [], ltrname: [] });
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const linearray = useSelector((state) => state.linearray);
  const dispatch = useDispatch();
  const location = useLocation();
  const uname = localStorage.getItem("usrname");
  // const ltryid = useSelector((state) => state.ltryid);
  // const ltryname = useSelector((state) => state.ltryname);
  var linenum = 3;
  var temp = [];
  // useEffect(()=>{
  //   dispatch({ type: "setLineArray", payload: [] });
  // })
  let Ltr_name = "";
  const userid = localStorage.getItem("userid");
  console.log("userid", userid);
  const cnt = localStorage.getItem("cartcount");

  useEffect(() => {
    let temp = [...linearray];
    console.log(temp.length);
    if (temp.length == 0) {
      for (var i = 0; i < linenum; i++) {
        var tarray = [];
        for (let j = 1; j <= 39; j++) {
          let tobj = { value: j, isselected: false };
          tarray.push(tobj);
        }
        temp.push(tarray);
      }
    }

    dispatch({ type: "setLineArray", payload: temp });
    console.log("lineary" + JSON.stringify(linearray));
    if (location.state.lotterydetails != "") {
      setLotterylist(location.state.lotterydetails);
    } else {
      let url = "http://localhost:8080/ticketselector_lotteryfetch";
      let header = {};
      let request = {};
      axios
        .post(url, request, header)
        .then((res) => {
          console.log(res.data);
          // setDetails(res.data)
          setLotterylist(res.data);
        })
        .catch();
    }
  }, []);
  const home = () => {
    navigate("/");
  };
  const chkout = () => {
    // console.log("lname", location.state.name);
    if (userid == "") {
      navigate("/Login");
    } else {
      console.log("ltryname", ltryname);
      navigate("/Checkout", { state: { lid: ltryid, lname: "" } });
    }
  };

  const childdata = (e, selection, setShowchk) => {
    e.preventDefault();
    setValue(selection);

    if (selection.length < 5) {
      setErrmsg("Need to select 5 numbers before confirming!!");
    } else if (selection != "") {
      let url = "http://localhost:8080/insertunit";
      let request = {
        firstnum: selection[0],
        secondnum: selection[1],
        thirdnum: selection[2],
        fournum: selection[3],
        fifthnum: selection[4],
        id: id,
      };

      setShowchk(true);
      setErrmsg("");
    }
  };
  const callfn = (e) => {
    // var x = document.getElementById("abc").label;
    // console.log("x", x);
    // setLtryname(x);
    // setltryid(e.target.value);
    console.log(e.target.value);
   let obj=JSON.parse(e.target.value)
    console.log(obj.id);
    setltryid(obj.id)
    console.log(document.getElementById(obj.id))
  
  };
  const label5click = () => {
    navigate("/");
  };
  const label7click = () => {
    console.log(localStorage.getItem("role"));
    if (localStorage.getItem("role") == 1) {
      navigate("/AdminDashboard");
    } else if (localStorage.getItem("role") == 2) {
      navigate("/UserPage");
    }
  };
  return (
    <>
      <div className="ticketselector_outer">
        <HeaderUser
          label1={uname}
          label3={""}
          label5={"Home"}
          label7={"Dashboard"}
          headerclick={home}
          label5click={label5click}
          label7click={label7click}
        />
        {/* <Drawinformation/> */}

        <div className="ticketselector_lotteryname">
          <label> Lottery Name : </label>

          <select
            // value={ltryname}
            onChange={(e) => callfn(e)}
          >
            <option>--Select--</option>
            {lotterylist.map((itm, index) => {
              const a=itm.id;
              const b=itm.txtLotteryname;
              return  (
                <>
                 
                  <option
                    value={'{"id":'+a+'}'} id={'{"id":'+a+'}'}
                  >
                   <label>
                      {itm.txtLotteryname}
                      {""}
                      {itm.drawdate}
                      </label>
                  </option>
                  <option>{itm.txtSubLottery}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="ticketselector_line">
          {linearray.map((item, index) => {
            return (
              <>
                <Lineselector
                  label1={"Unit" + index}
                  setValue={setValue}
                  childdata={childdata}
                  lineindex={index}
                />
              </>
            );
          })}
        </div>
        <div className="Ticketslector_errmsg">{err}</div>

        <Linemessage />
        <div className="ticketselector_chkoutbtn">
          <Checkoutbutton
            value2={"Checkout"}
            chkout={chkout}
            linenum={linenum}
          />
        </div>

        {/* <Footer/> */}
      </div>
    </>
  );
}
