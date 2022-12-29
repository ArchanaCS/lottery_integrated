import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/VerifyOTP.css";
import Failure from "./Failure";
import Sucess from "./Sucess";
export default function VerifyOTP({ show, setShow, newid }) {
  const [showsucess, setShowsucess] = useState(false);
  const [showfailure, setShowfailure] = useState(false);
  const navigate = useNavigate();
  const [eotp, setEotp] = useState("");
  console.log("newid created", newid);

  const verify = () => {
    console.log("newid created", newid);
    // alert(newid)
    let url = "http://localhost:8080/verify";
    let request = { id: newid, otp: eotp };
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data[0].txtOtp);
        var otp_db = res.data[0].txtOtp;
        console.log("eotp", eotp);
        if (otp_db != eotp) {
          setShowfailure(true);
          setEotp("")
        } else {
          setShowsucess(true);
          let update_req={id:newid};
          let update_url="http://localhost:8080/confirmuser";
          let update_header={};
          axios.post(update_url,update_req,update_header).then((res)=>{
            console.log(res.data)

          }).catch()
        }
      })
      .catch();
  };
 const reverify=()=>{
  
  console.log("reverfiy");
        let url_otp = "http://localhost:8080/otpgenerate";
        let request_otp = { newid:newid };
        console.log("request_otp",request_otp)
        let header_otp = {};
        axios
          .post(url_otp, request_otp, header_otp)
          .then((res) => {
            console.log("response", res.data);
            var email = res.data[0].txtUemail;
            var otp = res.data[0].txtOtp;
            console.log("email is", email);
            let url_email = "http://localhost:8080/sendmail";
            let request_email = { email: email, otp: otp };
            let header_email = {};
            console.log(request_email);
            axios
              .post(url_email, request_email, header_email)
              .then((res) => {
                console.log("response", res.data);
              })
              .catch();
            setShow(true);
            console.log(res.data.insertId);
          })
          .catch();
      
 }
  return (
    <>
      {showsucess ? (
        <>
          <Sucess showsucess={showsucess} setShowsucess={setShowsucess} />
        </>
      ) : (
        <></>
      )}
      {showfailure ? (
        <>
          <Failure showfailure={showfailure} setShowfailure={setShowfailure} />
        </>
      ) : (
        <></>
      )}
      <div className="otp_outer">
        <div className="otp_inner">
          <div className="otp_inner_label">
            <label>Verify OTP</label>
          </div>
          <div className="otp_inner_input">
            <input
              type="text"
              placeholder="OTP"
              onChange={(e) => {
                setEotp(e.target.value);
              }}
            />
          </div>
          <div className="otp_outer_button">
            <button onClick={verify}> Verify</button>
            <button onClick={reverify}>Resend</button>
          </div>
        </div>
      </div>
    </>
  );
}
