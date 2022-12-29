import "./Drawresult.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Drawresult() {



  var current = new Date();
  const dt = current.getDate();
  const month = current.getMonth();
  const yr = current.getFullYear();

  const[lotteryresult, setLotteryresult]=useState([]);
  const[latestlotteryresult, setLatestLotteryresult]=useState([]);

  useEffect(()=>{
    let url="http://localhost:8080/lotterydrawresult";
    let req={};
    let header={};
    axios.post(url,req,header).then((res) => {
      setLotteryresult(res.data);
      console.log("lotteryresult",res.data);
    }).catch();
  

  let url1="http://localhost:8080/latestlotterydrawresult";
  let req1={};
  let header1={};
  axios.post(url1,req1,header1).then((res) => {
    setLatestLotteryresult(res.data);
    console.log("latestlotteryresult",res.data);
  }).catch();

},[]); 

  return (
    <div className="drawres_container">
      <div className="drawres_box">
        <div className="drawres_header">
          <div className="drawres_header_date">
            <p>
              Today {dt}.{month + 1}.{yr}{" "}
            </p>
          </div>
        </div>
        <div className="drawres_body">
          <div className="drawres_body_sec_lft">
            <div className="drawres_body_sec_lft_content">
              <div className="drawres_body_sec_header">
                <h1>Latest Lottery Draw Results</h1>
              </div>

              <div className="drawres_body_lft_row">
                <div className="drawres_body_sec_lft_row_header">
                  <p>Lottery Name</p>
                  <p>Amount</p>
                </div>
                {lotteryresult.map((itm,index)=>{
                  return(
                    <div className="drawres_body_sec_lft_row">
                  <div className="drawres_sec_lft_row_div">
                    <div className="drawres_sec_lft_row_inner_div">
                      <p>{itm.txtLotteryname}</p>
                      <p>{itm.txtLotteryprize}</p>
                    </div>
                  </div>
                </div>
                  )
                })}
                
            
                
              </div>
            </div>
          </div>
          <div className="drawres_body_sec_rgt">
            
            <div className="drawres_body_sec_rgt_content">
              <div className="drawres_body_sec_header">
                <h1>Latest Grand Draw Results</h1>
              </div>
              {latestlotteryresult.map((itm,index)=>{
              return(
                <div className="drawres_body_sec_rgt_num">
                <div className="drawres_rgt_numbers_div">
                  <p>{itm.txtFirstchoicenumber}</p>
                </div>
                <div className="drawres_rgt_numbers_div">
                  <p>{itm.txtSecondchoicenumber}</p>
                </div>
                <div className="drawres_rgt_numbers_div">
                  <p>{itm.txtThirdchoicenumber}</p>
                </div>
                <div className="drawres_rgt_numbers_div">
                  <p>{itm.txtFourthchoicenumber}</p>
                </div>
                <div className="drawres_rgt_numbers_div">
                  <p>{itm.txtFifthoicenumber}</p>
                </div>
              </div>
              )
            })}
              
              <div className="drawers_body_sec_rgt_row">
                <div className="drawres_sec_rgt_row_div">
                  <div className="drawres_sec_rgt_row_inner_div">
                    <p>Matching 5/5</p>
                    <p>1 Winners</p>
                  </div>
                </div>
                <div className="drawres_sec_rgt_row_div">
                  <div className="drawres_sec_rgt_row_inner_div">
                    <p>Marching 4/5</p>
                    <p>37 Winners</p>
                  </div>
                </div>
                <div className="drawres_sec_rgt_row_div">
                  <div className="drawres_sec_rgt_row_inner_div">
                    <p>Matching</p>
                    <p>1,573 Winners</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="drawres_footer">
          <button>Previous Results</button>
        </div>
      </div>
    </div>
  );
}
