import "./Signup.css";
import { GiCash } from "react-icons/gi";
import Input from "../components/Input";
import { RiEyeCloseFill, RiLinkedinBoxFill } from "react-icons/ri";
import { BiCopyright } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import VerifyOTP from "./VerifyOTP";
import axios from "axios";
// import logo from "./image/Linkedin_logo.png";
import Sucess from "./Sucess";
function Signup() {
  const [show, setShow] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [uname, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [newid, setNewid] = useState("");
  const [errmsg, setErr] = useState("");
  const [errpmsg, setPErr] = useState("");

  const verifyotp = () => {
    console.log("before", show);
    setShow(true);
    console.log(show);
    // navigate("/Verifyotp")
  };
  const signup = () => {
    let url = "http://localhost:8080/insertuser";
    let request = {
      fname: fname,
      lname: lname,
      uname: uname,
      password: password,
    };
    console.log("passwd and repw", password, repassword);
    let header = {};
    if (fname && lname && uname && password && repassword != "") {
      if (password != repassword) {
        console.log("repassword", repassword);
        setPErr("Password not same");
      } else
        axios
          .post(url, request, header)
          .then((res) => {
            setNewid(res.data.insertId);
            var newid = res.data.insertId;
            let url_otp = "http://localhost:8080/otpgenerate";
            let request_otp = { newid: newid };
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
          })
          .catch();
    } else {
      setErr("Mandatory fileds cannot be empty");
    }
  };

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
    // console.log("usernameis ", e);
  };
  const handleFirstnameChange = (e) => {
    setFname(e.target.value);
    // console.log("firstname ", e);
  };
  const handleLastnameChange = (e) => {
    setLname(e.target.value);
    // console.log("lastname ", e);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("passwordis ", password);
  };
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    console.log("repasswordis ", repassword);
  };
  return (
    <>
      {show ? (
        <>
          <VerifyOTP show={show} setShow={setShow} newid={newid} />
        </>
      ) : (
        <></>
      )}

      <div className="signup_outer">
        <div className="signup_container">
          <div className="signup_container_row signup_container_header">
            <GiCash
              style={{
                width: 50,
                height: 50,
              }}
            />
          </div>
          <div className="signup_container_row">
            <label>Signup</label>
          </div>
          <div className="signup_container_row">
            <Input typevalue={"text"} name={"FirstName"} onChange={handleFirstnameChange} />
          </div>
          <div className="signup_container_row">
            <Input typevalue={"text"} name={"LastName"} onChange={handleLastnameChange} />
          </div>
          <div className="signup_container_row">
            <Input typevalue={"email"} name={"Email"} onChange={handleEmailChange}/>
          </div>
          <div className="signup_container_row">
            <Input typevalue={"password"} name={"Password"} onChange={handlePasswordChange} />
          </div>
          <div className="signup_container_row">
            <Input typevalue={"text"} name={"RePassword"} onChange={handleRePasswordChange} />
          </div>
          <div className="ermsg">
            {errmsg}
            {errpmsg}
          </div>
          <div className="signup_container_row">
            <button onClick={signup}>Create your account</button>
          </div>
          <div className="signup_container_row">
            <div className="signup_container_row_col"></div>
            <div className="signup_container_row_col2">or</div>
            <div className="signup_container_row_col"></div>
          </div>

          <div className="signup_container_row">
            <label>Sign up with</label>
          </div>
          <div className="signup_container_row2">
            <button>
              <FcGoogle
                style={{
                  width: 20,
                  height: 20,
                  paddingRight: 10,
                  paddingBottom: 5,
                }}
              />{" "}
              Google
            </button>

            <button>
              <AiFillFacebook
                style={{
                  color: "blue",
                  width: 20,
                  height: 20,
                  paddingRight: 10,
                  paddingBottom: 5,
                }}
              />
              Facebook
            </button>
          </div>
          <div className="signup_container_row3">
            {/* <div className="signup_row3"> */}
            <label className="signup_container_row3_new">
              By Signing up you agree to our{" "}
            </label>
            <label className="signup_container_row3_join">Terms of service</label>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;


