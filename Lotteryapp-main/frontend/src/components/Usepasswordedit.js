import "./Usepasswordedit.css";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Usepasswordedit() {
  const [currentpassword, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const updateclick = (e) => {
    if (newpassword == confirmpassword) {
      let url = "http://localhost:8080/updatepassword";
      let req = { password: newpassword, userid:2};
      let header = {};
      axios
        .post(url, req, header)
        .then((res) => {
          console.log(res.data);
        })
        .catch();
    } else {
      alert("incorectpassword");
    }
  };
  
  useEffect(() => {
    let url = "http://localhost:8080/showpassword";
    let req = { userid: 2};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        setPassword(res.data[0].txtUpassword);
        console.log(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="Useprofileedit">
      <div className="Useprofileedit_colm">
        <div className="Useprofileedit_colm_raw1">
          <div className="Useprofileedit_colm_raw1_label">
            <label>Current Password</label>
          </div>

          {/* <div className="Useprofileedit_colm_raw1_icon">
            <BiHide />
          </div> */}
                <div className="Useprofileedit_colm_raw1_input">
                  <input
                    type={"text"}
                    value={currentpassword}
                  ></input>
                </div>
        </div>
        <div className="Useprofileedit_colm_raw1">
          <div className="Useprofileedit_colm_raw1_label">
            <label>New Password</label>
          </div>
          {/* <div className="Useprofileedit_colm_raw1_icon">
            <BiHide />
          </div> */}
          <div className="Useprofileedit_colm_raw1_input">
            <input
              type={"password"}
              placeholder="New Password" value={newpassword}
              onChange={(e) => {
                setNewpassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="Useprofileedit_colm_raw1">
          <div className="Useprofileedit_colm_raw1_label">
            <label>Confirm Password</label>
          </div>
          {/* <div className="Useprofileedit_colm_raw1_icon">
            <BiHide />
          </div> */}
          <div className="Useprofileedit_colm_raw1_input">
            <input
              type={"password"}
              placeholder="Confirm Password" value={confirmpassword}
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="Useprofileedit_colm_raw2">
          <button
            onClick={(e) => {
              updateclick(e);
            }}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
