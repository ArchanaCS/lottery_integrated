import "../components/Timer.css";
import { useEffect, useState} from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import TicketSelector from "../pages/TicketSelector";

//install react-circular-progressbar before using this component
//npm install --save react-circular-progressbar

export default function Timer({ details,deadline,prize,ticketPurchase,lotteryid,variable1,variable2,variable3,variable4 ,variable5}) {
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  // console.log("deadline",details)
  const getDate = () => {
    const timeSeperation = Date.parse(deadline) - Date.now();
    setDay(Math.floor(timeSeperation / (1000 * 60 * 60 * 24)));
    setHour(Math.floor((timeSeperation / (1000 * 60 * 60)) % 24));
    setMinute(Math.floor((timeSeperation / 1000 / 60) % 60));
    setSecond(Math.floor((timeSeperation / 1000) % 60));
  };

  const sectoper = Math.floor(second * 100) / 60;
  const mintoper = (minute * 100) / 60;
  const hrtoper = (hour * 100) / 24;

  useEffect(() => {
    const interval = setInterval(() => getDate(deadline), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="timer_container">
        
          {details.map((itm,indx)=>{
            return<>
            <div className="timer_lotteryname">
            <label>{itm[variable2]}</label><br/>
            <label>{itm[variable5]}</label>
        </div>
        <div className="timer_lotteryprice">
         <div><label>Grand draw</label>
          <br />
          <label>INR {itm[variable3]}</label></div> 
         {/* <div> <button onClick={<TicketSelector lname={itm[variable2]}/>}> Buy now</button></div> */}
          <div><button onClick={()=>ticketPurchase()}> Buy now</button></div>
        </div>
            </>
          })}
         
       
        <div className="timer_lottery_countdown_sec">
          <div className="timer_lotterydraw_date">
            {/* <label>Saturday</label> */}
            <br />
            <label>{deadline}</label>
          </div>
          <div className="timer_countdown">
            <div className="timer_countdown_sub">
              <CircularProgressbarWithChildren value={day} styles={buildStyles({
          pathColor: "goldenrod",
          trailColor: "white"})}>
                <div className="progressbar_child">
                  <h6>
                    <strong>{day}</strong>
                  </h6>
                  <label>Days</label>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="timer_countdown_sub">
              <CircularProgressbarWithChildren value={hrtoper} styles={buildStyles({
          pathColor: "goldenrod",
          trailColor: "white"})}>
                <div className="progressbar_child">
                  <h6>
                    <strong>{hour}</strong>
                  </h6>
                  <label>Hours</label>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="timer_countdown_sub">
              <CircularProgressbarWithChildren value={mintoper} styles={buildStyles({
          pathColor: "goldenrod",
          trailColor: "white"})}>
                <div className="progressbar_child">
                  <h6>
                    <strong>{minute}</strong>
                  </h6>
                  <label>Minutes</label>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="timer_countdown_sub">
              <CircularProgressbarWithChildren value={sectoper} styles={buildStyles({
          pathColor: "goldenrod",
          trailColor: "white"})}>
                <div className="progressbar_child">
                  <h6>
                    <strong>{second}</strong>
                  </h6>
                  <label>Seconds</label>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}