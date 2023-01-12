import HeaderUser from "../components/HeaderUser";
import Drawinformation from "../components/Drawresult";
import Lineselector from "../components/Lineselector";
import Offerselector from "../components/Offerselector";
import Linemessage from "../components/Linemessage";
import Footer from "../components/Footer";
import Lotterybuynow from "../components/Lotterybuynow";
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
import { loadClientAuth2 } from "gapi-script";
import usestate from "usestate";
export default function TicketSelector() {
  const [value, setValue] = useState([]);
  const [subltry, setSubltry] = useState([]);
  const [err, setErrmsg] = useState("");
  const [maindate, setMaindate] = useState("");
  const [subdate, setSubdate] = useState("");
  const [linearry, setLinearray] = useState({ main: [], sub: [] });
  const [ltryname, setLtryname] = useState("");
  const [lotterylist, setLotterylist] = useState([]);
  const [ltryid, setltryid] = useState({ ltrid: [], ltrname: [] });
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [lotteryid, setLotteryid] = useState("");
  const [lotterydetails, setLotterydetails] = useState([]);
  const linearray = useSelector((state) => state.linearray);
  const offerarray = useSelector((state) => state.offerarray);
  const dispatch = useDispatch();
  const location = useLocation();
  const usrname = localStorage.getItem("usrname");
  const [subltryid, setSubltryid] = useState("");
  const [show, setShow] = useState(false);
  //const [isfinishd, setisfinished] = useState(false);
  const isfinishd = useSelector((state) => state.issubidexist);
  console.log("isfinished",isfinishd)

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
    let id = location.state.lotterydetails[0].sub_id;
    setSubltryid(id);
    let temp = [...linearray];
    let t = [];
    // console.log(temp);
    if (temp.length == 0) {
      for (var i = 0; i < linenum; i++) {
        var tarray = [];
        for (let j = 1; j <= 49; j++) {
          let tobj = { value: j, isselected: false };
          tarray.push(tobj);
          // tarray.push()
        }
        temp.push(tarray);
        // temp.push({"main":tarray,"sub":tarray})
        // t.push(...{"id":1,"name":"hai"})
      }
    }

    dispatch({ type: "setLineArray", payload: temp });
    console.log("linearray" + JSON.stringify(linearray));

    console.log("sublotryid=>" + isfinishd);
    if (isfinishd) {
      
      let t_offer = [];

      for (var i = 0; i < linenum; i++) {
        var offerarray = [];
        for (let j = 1; j <= 39; j++) {
          let offerobj = { value: j, isselected: false };
          offerarray.push(offerobj);
        }
        t_offer.push(offerarray);
      }
      //setisfinished(false);
      dispatch({ type: "setOfferArray", payload: t_offer });
    }

    console.log("offerary" + JSON.stringify(offerarray));

    let url = "http://localhost:8000/drawticket";
    let request = {};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log("draw", res.data);

        setMaindate(res.data[0].drawdate);
        setSubdate(res.data[0].sub_drawdate);
        // setLotteryname(res.data[0].txtLotteryname);
        // setPrize(res.data[0].txtLotteryprize);
        setLotteryid(res.data[0].id);
        setLotterydetails(res.data);
      })
      .catch();
    if (location.state.lotterydetails != "") {
      console.log("location.state", location.state.lotterydetails);
      setLotterylist(location.state.lotterydetails);
    } else {
      let url = "http://localhost:8000/ticketselector_lotteryfetch";
      let header = {};
      let request = {};
      axios
        .post(url, request, header)
        .then((res) => {
          // console.log("list", res.data);
          // setDetails(res.data)
          setLotterylist(res.data);
        })
        .catch();
    }
  }, []);
  const home = () => {
    navigate("/");
  };
  const chkout = (id) => {
    if (usrname == "") {
      navigate("/Login");
    }
    console.log("selected id", id);
    let url = "http://localhost:8000/insertunit";
    let header = {};

    const valu = [];
    const temp = [...linearray];
    for (const itrt of temp) {
      let temp = [];
      for (const t of itrt) {
        if (t.isselected) temp.push(t.value);
      }
      valu.push(temp);
    }
    for (var i = 0; i < valu.length; i++) {
      if (valu[i] != "") {
        let request = { uid: 2, lid: id, arr: valu[i] };

        // console.log(request);
        axios
          .post(url, request, header)
          .then((res) => {
            console.log(res.data);
            if (res.data != "Error") {
              if (!isfinishd) {
                console.log("isfinished", isfinishd);
                dispatch({ type: "setLineArray", payload: [] });
               navigate("/Checkout", {
                  state: { lid: lotteryid, subltryid: subltryid },
                });
              } else {
                setShow(!show);

                dispatch({ type: "issubidexist", payload: false });
              }
             
            }
          })
          .catch();
      }
    }
    // }
  };
  const offerchkout = () => {
    let url = "http://localhost:8000/insertunit";
    let header = {};

    const valu = [];
    const temp = [...offerarray];
    for (const itrt of temp) {
      let temp = [];
      for (const t of itrt) {
        if (t.isselected) temp.push(t.value);
      }
      valu.push(temp);
    }
    for (var i = 0; i < valu.length; i++) {
      if (valu[i] != "") {
        let request = { uid: 2, lid: subltryid, arr: valu[i] };

        console.log(request);
        axios
          .post(url, request, header)
          .then((res) => {
            console.log(res.data);
            if (res.data != "Error") {
              navigate("/Checkout", {
                state: { lid: lotteryid, subltryid: subltryid },
              });

              setShow(!show);

              dispatch({ type: "issubidexist", payload: false });
            }
          })
          .catch();
      }
    }
  };

  const childdata = (e, selection, setShowchk) => {
    e.preventDefault();
    setValue(selection);

    if (selection.length < 5) {
      setErrmsg("Need to select 5 numbers before confirming!!");
    } else if (selection != "") {
      let url = "http://localhost:8000/insertunit";
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
    console.log("here");
    console.log(e.target.value);
    let obj = JSON.parse(e.target.value);
    console.log("objid", obj.id);
    console.log(obj.value);
    setltryid(obj.id);
    setLtryname(obj.value);

    let url = "http://localhost:8000/subltryfetch";
    let req = { id: obj.id };
    console.log("req", req);
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        console.log("res", res.data);
        setSubltry(res.data);
      })
      .catch();
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
    } else if (localStorage.getItem("role") == "") {
      navigate("/");
    }
  };
  return (
    <>
      <div className="ticketselector_outer">
        <HeaderUser
          label1={usrname}
          label3={""}
          label5={"Home"}
          label7={"Dashboard"}
          headerclick={home}
          label5click={label5click}
          label7click={label7click}
        />
        {/* <Drawinformation/> */}
        
         {!show ? (<div className="ticketslector_lotterybuynow">
            <Lotterybuynow
              details={lotterydetails}
              deadline={maindate}
              // prize={prize}
              // ticketPurchase={ticketPurchase}
              lotteryid={lotteryid}
              variable1={"id"}
              variable2={"main_ltry"}
              variable3={"txtFirstprize"}
              variable4={"drawdate"}
              variable5={"sub_ltry"}
            />
          </div>):
       
        (<div className="ticketslector_lotterybuynow">
            <Lotterybuynow
              details={lotterydetails}
              deadline={subdate}
              // prize={prize}
              // ticketPurchase={ticketPurchase}
              lotteryid={lotteryid}
              variable1={"Sub_id"}
              variable2={"sub_ltry"}
              variable3={"txtFirstprize"}
              variable4={"sub_drawdate"}
              variable5={"sub_ltry"}
            />
          </div>)}
        
        {/* <div className="ticketselector_lotteryname">
          <label> Lottery Name : </label>

          <select
          
            onChange={(e) => callfn(e)}
          >
            <option>--Select--</option>
            {lotterylist.map((itm, index) => { 
              let t='{"id":"'+itm.id+'","value":"'+itm.main_ltry+'"}';
              
              return (
                <>
                
                  <option value={t}>
                    <label>
                    
                      {itm.main_ltry}
                      {""}
                      {itm.drawdate}
                      
                      
                    </label>
                  </option>
                 
               
                
                </>
              );
            })}
          </select>
         {subltry.map((item,index)=>{
          return<>
          <label>Sub Lottery  : {item.sub_ltry}</label>
          </>
         })}
        </div> */}
        {!show ? (<div>
          <div className="ticketselector_line">
            {linearray.map((item, index) => {
              return (
                <>
                  <Lineselector
                    label1={"Unit" + index}
                    setValue={setValue}
                    childdata={childdata}
                    lineindex={index}
                    ltryid={ltryid}
                    show={!show}
                    array={linearray}
                    text={"linearray"}
                  />
                </>
              );
            })}
          </div>
          <Linemessage />
          <div className="ticketselector_chkoutbtn">
            <Checkoutbutton
              value2={"Checkout"}
              chkout={() => chkout(lotteryid)}
              linenum={linenum}
            />
          </div>
        </div>):

       (<div>
          <div className="ticketselector_line">
            {offerarray.map((item, index) => {
              return (
                <>
                  <Offerselector
                    label1={"Unit" + index}
                    setValue={setValue}
                    childdata={childdata}
                    lineindex={index}
                    ltryid={ltryid}
                    show={show}
                    array={linearray}
                    text={"linearray"}
                  />
                </>
              );
            })}
             </div>
             <Linemessage />
             <div className="ticketselector_chkoutbtn">
            <Checkoutbutton
              value2={"Checkout"}
              chkout={() => offerchkout(subltryid)}
              linenum={linenum}
            />
          </div>
         
         
         
        </div>)}

        <div className="Ticketslector_errmsg">{err}</div>

        {/* <Linemessage />
        <div className="ticketselector_chkoutbtn">
          <Checkoutbutton
            value2={"Checkout"}
            chkout={chkout}
            linenum={linenum}
          />
        </div> */}

        {/* <Footer/> */}
      </div>
    </>
  );
}
