import "./winners.css";
import axios from "axios";
import pic from "../images/dad-img.png";
import { useEffect,useState } from "react";
export default function Winners() {
  const[winner,setWinners]=useState("");
  useEffect(() => {
    let url = "http://localhost:8000/winners";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        setWinners(res.data[0].winnners);
        console.log(res.data[0].winnners);
       
      })
      .catch();
  },[]);
  return (
    <div className="Winner">
      <div className="Winners_raw">
        <div className="Winners_raw_column1">
          <label className="Winners_raw_column1_label1">
            <h2>Total Winners to Date</h2>
          </label>
          <label className="Winners_raw_column1_label2">
            <h3>{winner}</h3>
            
          </label>
        </div>

        <div className="Winners_raw_column2">
          <img src={pic} alt={"dadandson"} />
        </div>
      </div>
    </div>
  );
}
