import "../components/HeaderUser.css";
import { useState,useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { BiSearchAlt } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { GiCash } from "react-icons/gi";
import { BiWorld } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
export default function HeaderUser({
  label1,
  label2,
  label3,
  label4,
  label5,
  label6,
  label7,
  label8,
  searchbutton,
  label1click,
  label4click,
  label5click,
  label6click,
  label7click,
  label8click,
  value
}) 
{

  const[country,setCountry]=useState("");
  const options= useMemo(() => countryList().getData(), [])
  console.log(options)
  const navigate = useNavigate();

  const handlechange=country=>{
    setCountry(country)
  }
  console.log(country.label)
   const countrydropstyle={Select: (styles) => ({...styles,backgroundColor:"#020223",color:"white"}),option:(styles)=>{return{...styles,backgroundColor:"#020223",color:"cornflowerblue"}}};
   const logout=()=>{
    localStorage.setItem("usrname","")
    navigate("/")
   }
   
  return (
    <div className="HeaderUser">
      <div className="Header_row1">
        <div className="Header_row1_clm0">
          <div className="Header_row1_clm0_logo">
            <GiCash />
          </div>
        </div>
        <div className="Header_row1_clm1">
          <label className="Header_row1_clm1_label1">Lottery drums</label>
          <label className="Header_row1_clm1_label2">
            <i>from devfactory</i>
          </label>
        </div>
        <div className="Header_row1_clm2">
          <div className="Header_row1_clm2_search">
            <input type={"text"}></input>
            <div className="Header_row1_clm2_search_icon" onClick={(e) => searchbutton()}>
              <BiSearchAlt />
            </div>
          </div>
        </div>
        <div className="Header_row1_clm3">
          <div className="Header_row1_clm3_logo">
            <BiWorld />
          </div>
          <div className="Header_row1_clm3_option">
            <Select options={options} value={country} styles={countrydropstyle} onChange={handlechange}/>
          </div>
        </div>
        <div className="Header_row1_clm4">
        <div className="dropdown">
          <label onClick={(e) => label1click(e)}>{label1}</label>
          <div className="dropdown-content" onClick={logout}> 
          <label>Logout</label>
        </div>
          </div>
        </div>
        <div className="Header_row1_clm5">
          <div className="Header_row1_clm5_lt">
            <div className="Header_row1_clm5_lt_logo">
              <label>
                <b>{label2}</b>
              </label>
              <BsCart3 />
            </div>
          </div>
          <div className="Header_row1_clm5_rt">
            <label>
              <b>{label3}</b>
            </label>
          </div>
        </div>
      </div>
      <div className="Header_row2">
      
        <label type={value} onClick={(e) => label4click(e)}>{label4}</label>
        <label  onClick={(e) => label5click(e)}>{label5}</label>
        <label  onClick={(e) => label6click(e)}>{label6}</label>
        <label  onClick={(e) => label7click(e)}>{label7}</label>
        <label  onClick={(e) => label8click(e)}>{label8}</label>
      </div>
    </div>
  );
}