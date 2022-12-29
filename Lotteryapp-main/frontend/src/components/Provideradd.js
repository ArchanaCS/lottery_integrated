import { useState } from "react";
import Collapsible from "react-collapsible";
import Input from "./Input";
import axios from "axios";
import "../components/Provideradd.css"
import {MdArrowDropDownCircle} from "react-icons/md"

//install react-collapsible before using this component
//npm i react-collapsible

export default function Provideradd() {
  const [providername, setProvidername] = useState("");
  const [provideremail, setProvideremail] = useState("");
  const [providermobile, setProvidermobile] = useState("");
  const [provideraddress, setProvideraddress] = useState("");
  const [providerzip, setProviderzip] = useState("");
  const [providercity, setProvidercity] = useState("");


  const handleAddprovider=()=>{
    let url = "http://localhost:8000/addprovider";
    let req = {providername:providername,
      provideremail:provideremail,
      providermobile:providermobile,
      provideraddress:provideraddress,
      providerzipcode:providerzip,
      providercity:providercity
    }
    let header = {}
    axios.post(url, req, header).then((res)=>{
      console.log(res.data)
    }).catch();
    window.location.reload();
  }



  return (
    <>
      <div className="provideradd_container">
        
        <Collapsible
          trigger={<div>
          <div className="provideradd_header"><span><MdArrowDropDownCircle/></span><h4>Add new provider</h4></div>
        </div>}
        >
          <div className="provideradd_grid">
          <div className="provideradd_input">
            <Input
              name="Provider Name"
              onChange={(e) => {
                setProvidername(e.target.value);
              }}
            />
          </div>
          <div className="provideradd_input">
            <Input
              name="Email"
              onChange={(e) => {
                setProvideremail(e.target.value);
              }}
            />
          </div>
          <div className="provideradd_input">
            <Input
              name="Mobile Number"
              onChange={(e) => {
                setProvidermobile(e.target.value);
              }}
            />
          </div>
          <div className="provideradd_input">
            <Input
              name="Address"
              onChange={(e) => {
                setProvideraddress(e.target.value);
              }}
            />
          </div>
          <div className="provideradd_input">
            <Input
              name="Zip code"
              onChange={(e) => {
                setProviderzip(e.target.value);
              }}
            />
          </div>
          <div className="provideradd_input">
            <Input
              name="City"
              onChange={(e) => {
                setProvidercity(e.target.value);
              }}
            />
          </div>
          </div>
          <div className="provideradd_button"><button onClick={(e)=>{handleAddprovider(e)}}>Add</button></div>
        </Collapsible>
      </div>
    </>
  );
}