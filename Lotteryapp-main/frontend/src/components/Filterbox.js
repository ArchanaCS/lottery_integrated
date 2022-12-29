import "../components/Filterbox.css";
import { MdAddCircle } from "react-icons/md";
import Input from "./Input";
import { useState } from "react";
export default function Filterbox({
  showfilter,
  setName,
  setLotteryname,
  setPurchasedate1,
  setPurchasedate2,
  setDrawdate,
  handleclickfilter
}) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const selectUsername = () => {
    setShow(show ? false : true);
  };
  const selectLotteryname = () => {
    setShow1(show1 ? false : true);
  };
  const selectpurchasedate = () => {
    setShow2(show2 ? false : true);
  };
  const selectdrawdate = () => {
    setShow3(show3 ? false : true);
  };

  return showfilter ? (

     <div className="Filterui">
      <div className="Filterbox">
        <div className="Filterbox_row0">
          <label>FILTER</label>
        </div>
        <div className="Filterbox_row1">
          <div>
            <label>Username</label>
            <Model1
              show={show}
              Name={"Username"}
              setUname={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <MdAddCircle onClick={selectUsername} />
          </div>
        </div>
        <div className="Filterbox_row2">
          <div>
            <label>Lotteryname</label>
            <Model2
              show={show1}
              Name={"Lotteryname"}
              setlotteryname={(e) => setLotteryname(e.target.value)}
            />
          </div>
          <div>
            <MdAddCircle onClick={selectLotteryname} />
          </div>
        </div>
        <div className="Filterbox_row3">
          <div>
            <label>LotteryPurchasedate</label>
            <Model3
              show={show2}
              Name1={"Date from"}
              Name2={"Date to"}
              setpurchasedate1={(e) => setPurchasedate1(e.target.value)}
              setpurchasedate2={(e) => setPurchasedate2(e.target.value)}
            />
          </div>
          <div>
            <MdAddCircle onClick={selectpurchasedate} />
          </div>
        </div>
        <div className="Filterbox_row4">
          <div>
            <label>LotteryDrawdate</label>
            <Model4
              show={show3}
              Name={"LotteryDrawdate"}
              Setdrawdate={(e) => setDrawdate(e.target.value)}
            />
          </div>
          <div>
            <MdAddCircle onClick={selectdrawdate} />
          </div>
        </div>
        <div className="Filterbox_row5">
          <button onClick={handleclickfilter}>
            Apply Filter
          </button>
        </div>
      </div>
       
     </div> 
    ) : (
        <></>
      );
    }
function Model1({ show, Name, setUname }) {
  return show ? (
    <>
      <Input name={Name} onChange={setUname}/>
    </>
  ) : (
    <></>
  );
}
function Model2({ show, Name, setlotteryname }) {
  return show ? (
    <>
      <Input name={Name} onChange={setlotteryname} />
    </>
  ) : (
    <></>
  );
}
function Model3({ show, Name1, Name2, setpurchasedate1, setpurchasedate2 }) {
  return show ? (
    <>
      <div className="Model3_clm">
        <Input name={Name1} onChange={setpurchasedate1} />
        <Input name={Name2} onChange={setpurchasedate2} />
      </div>
    </>
  ) : (
    <></>
  );
}
function Model4({ show, Name, Setdrawdate }) {
  return show ? (
    <>
      <Input name={Name} onChange={Setdrawdate} />
    </>
  ) : (
    <></>
  );
}