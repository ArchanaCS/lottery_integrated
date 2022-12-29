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
export default function TicketSelector() {
  const [value, setValue] = useState([]);
  const [err, setErrmsg] = useState("");
  const [ltryname, setLtryname] = useState("");
  const [lotterylist, setLotterylist] = useState([]);
  const [ltryid, setltryid] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const linearray = useSelector((state) => state.linearray);
  const dispatch = useDispatch();
  const location = useLocation();
  const uname = localStorage.getItem("usrname");
  var linenum = 3;
  var temp = [];
  // useEffect(()=>{
  //   dispatch({ type: "setLineArray", payload: [] });
  // })
  let Ltr_name = "";
  const userid = localStorage.getItem("userid");
  console.log("userid", userid);
  useEffect(() => {
    if (location.state.name == "" && location.state.id == "") {
      console.log("Entered with null");
      let url = "http://localhost:8080/ticketselector_lotteryfetch";
      let header = {};
      let request = {};
      axios
        .post(url, request, header)
        .then((res) => {
          console.log(res.data);
          setLotterylist(res.data);
        })
        .catch();
    } else {
      lotterylist.push({
        id: location.state.id,
        txtLotteryname: location.state.name,
      });
    }

    let temp = [...linearray];
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
  }, []);
  const home = () => {
    navigate("/");
  };
  const chkout = () => {
    // console.log("lname", location.state.name);
    if (userid == "") {
      navigate("/Login");
    } else {
      navigate("/Checkout", {
        state: { lid: ltryid, lname: ltryname },
      });
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
  const callfn = () => {
    
    var d = document.getElementById("ddselect");
    var selected_ticket = d.options[d.selectedIndex].text;
    setLtryname(selected_ticket);
   
  };

  return (
    <>
      <div className="ticketselector_outer">
        <HeaderUser
          label1={uname}
          label3={""}
          label4={""}
          label6={"Home"}
          headerclick={home}
        />
        {/* <Drawinformation/> */}

        <div className="ticketselector_lotteryname">
          <label> Lottery Name : </label>

          <select
            id="ddselect"
            onChange={(e) => {
              setltryid(e.target.value);
              callfn();
            }}
          >
            <option>--Select--</option>
            {lotterylist.map((itm, index) => {
              return (
                <>
                  <option value={itm.id}>{itm.txtLotteryname}</option>
                  <option>{itm.drawdate}</option>
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
