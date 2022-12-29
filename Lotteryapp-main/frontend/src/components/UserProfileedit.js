import "./UserProfileedit.css";
import axios from "axios";
import profilepic from "../images/megan.png";
import { useState, useEffect } from "react";
export default function UserProfileedit() {
  const [fname, setFname] = useState([]);
  const [lname, setLname] = useState([]);
  const [email, setEmail] = useState([]);
  const [mobile, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);
  const [arraycity, setArraycity] = useState([]);
  var id= localStorage.getItem("id")
  useEffect(() => {
   
    console.log("id",id)
    let url = "http://localhost:8080/profile";
    let req = {userid:id};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        console.log("res in edit",res.data);
        setFname(res.data[0].txtFname);
        setLname(res.data[0].txtLname);
        setEmail(res.data[0].txtUemail);
        setAddress(res.data[0].txtaddress);
        setPhone(res.data[0].txtUphoneno);
        setCity(res.data[0].txtDistrict);
        setState(res.data[0].txtStatename);
        setCountry(res.data[0].txtCountryname);
      })
      .catch();

    let url1 = "http://localhost:8080/fetchcity";
    let req2 = {};
    let header3 = {};
    axios
      .post(url1, req2, header3)
      .then((res) => {
        setArraycity(res.data);
        console.log(res.data);
      })
      .catch();
  }, []);

  const updateclick = (e) => {
    let url = "http://localhost:8080/profileupdate";
    let req = { userid: id, phone: mobile, useraddress: address,city:city };
    let header = {};
    console.log(req)
    axios.post(url, req, header).then((res) => {});
  };

  return (
    <div className="UserProfileedit">
      <div className="UserProfileedit_head">
        <div className="UserProfileedit_head_raw1">
          <div className="UserProfileedit_head_raw1_btn">
            <button>Add image</button>
          </div>
          <div className="UserProfileedit_head_raw1_label">
            <label>Recommended size:130x130px</label>
          </div>
        </div>
        <div className="UserProfileedit_head_raw2">
          <div className="UserProfileedit_head_raw2_img">
            <img src={profilepic} alt="profilepic" />
          </div>
          <div className="UserProfileedit_head_raw2_label">
            <label>Remove Image</label>
          </div>
        </div>
      </div>
      <div className="UserProfileedit_body">
        <div className="UserProfileedit_body_raw1">
          <div className="UserProfileedit_body_raw1_clmn1">
            <label>First Name</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            ></input>
          </div>
          <div className="UserProfileedit_body_raw1_clmn2">
            <label>Last Name</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="UserProfileedit_body_raw2">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="UserProfileedit_body_raw2">
          <label>Contact Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          ></input>
        </div>
        <div className="UserProfileedit_body_raw2">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></input>
        </div>
        <div className="UserProfileedit_body_raw1">
          <div className="UserProfileedit_body_raw1_clmn1">
            <label>City</label>
           
            <select
              
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option>{city}</option>
              {arraycity.map((item, index) => {
               
                return (
                  <>
                   
                    <option value={item.id}>{item.txtDistrict}</option>
                  </>
                );
              })}
              
            </select>
          </div>
          <div className="UserProfileedit_body_raw1_clmn2">
            <label>State</label>
            <select>
              <option>{state}</option>
            </select>
          </div>
        </div>
        <div className="UserProfileedit_body_raw1">
          <div className="UserProfileedit_body_raw1_clmn1">
            <label>Zip code</label>
            <select></select>
          </div>
          <div className="UserProfileedit_body_raw1_clmn2">
            <label>Country</label>
            <select>
              <option>{country}</option>
            </select>
          </div>
        </div>
        <div className="UserProfileedit_body_raw4">
          <div className="UserProfileedit_body_raw4_btn">
            <button
              onClick={(e) => {
                updateclick(e);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
