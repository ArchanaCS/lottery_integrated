import "./Login.css";
import { GiCash } from "react-icons/gi";
import { RiLinkedinBoxFill } from "react-icons/ri";
import { BiCopyright } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Googlelogin from "../components/Googlelogin";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  
  const login = () => {
    console.log("hi");
    let url = "http://localhost:8080/uservalidate";
    let request = { username: username, password: password };
    let header = {};
    console.log(request);
    axios
      .post(url, request, header)
      .then((res) => {
        if (res.data == "User doesn't exist") {
          console.log("user",res.data);
         
          setErrmsg("Check username or password !!");

          // navigate()
        } else {
          setErrmsg("");
          console.log(res.data);
          localStorage.setItem("userid",res.data[0].id)
          localStorage.setItem("usrname",res.data[0].txtFname)
          console.log("username",res.data[0].txtFname)
          if(res.data[0].refUserRole==1)
          {
            navigate("/AdminDashboard")
          }
          else if(res.data[0].refUserRole==2)
          {
            navigate("/UserPage")
          }
          
        }
      })
      .catch();
  };
  const signup = () => {
    navigate("/Signup");
  };
  const handleEmailChange = (e) => {
    setUsername(e.target.value);
    console.log("usernameis ", e);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("passwordis ", e);
  };
  const glogin = () => {
    <Googlelogin />;
    console.log("hi");
  };

  return (
    <div className="login_outer">
      <div className="login_container">
        <div className="login_container_row login_container_header">
          <GiCash
            style={{
              width: 50,
              height: 50,
            }}
          />
        </div>
        <div className="login_container_row">
          <label onClick={login}>Login</label>
        </div>

        <div className="login_container_row">
          <Input   typevalue={"email"} name={"Username"} onChange={handleEmailChange} />
        </div> 
        <div className="login_container_row">
          <Input  typevalue={"password"} name={"Password"} onChange={handlePasswordChange} />
        </div>

        <div className="login_container_row">
          <label>Forget password?</label>
        </div>
        <div className="login_errmsg">{errmsg}</div>

        <div className="login_container_row">
          <button onClick={login}>Sign in</button>
        </div>
        <div className="login_container_row">
          <div className="login_container_row_col"></div>
          <div className="login_container_row_col2">or</div>
          <div className="login_container_row_col"></div>
        </div>
        <div className="login_container_row2">
          <button onClick={login}>
            <FcGoogle
              style={{
                width: 20,
                height: 20,
                paddingRight: 10,
                paddingBottom: 5,
              }}
            />{" "}
            Sign in with Google
          </button>
        </div>
        <div className="login_container_row2">
          <button>
            <AiFillFacebook
              style={{
                color: "blue",
                width: 20,
                height: 20,
                paddingRight: 10,
                paddingBottom: 5,
              }}
            />{" "}
            Sign in with Facebook
          </button>
        </div>

        <div className="login_container_row3">
          <label className="login_container_row3_new">New to Lotterydrums?</label>
          <label className="login_container_row3_join" onClick={signup}>
            Join Now
          </label>
        </div>
      </div>
    </div>
  );
}
export default Login;