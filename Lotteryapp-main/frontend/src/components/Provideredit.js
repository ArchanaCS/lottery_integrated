import "../components/Provideredit.css";
import { AiFillEdit, AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { Collapsible } from "collapsible-react-component";
import "collapsible-react-component/dist/index.css";
import Input from "./Input";
import { useEffect } from "react";
import axios from "axios";
//install collapsible-react-component before using this component
//npm i collapsible-react-component
export default function Provideredit() {
  // const [open, setOpen] = useState(false);
  const [providereditid, setProvidereditid] = useState("");
  const [providereditname, setProvidereditname] = useState("");
  const [providereditemail, setProvidereditemail] = useState("");
  const [providereditnumber, setProvidereditnumber] = useState("");
  const [providereditaddress, setProvidereditaddress] = useState("");
  const [providereditzip, setProvidereditzip] = useState("");
  const [providereditcity, setProvidereditcity] = useState("");
  const [providerarray, setProviderarray] = useState([]);
  function expandCol(itm, indx) {
    let temp = [...providerarray];
    for (const itm of temp) {
      itm.isClicked = false;
    }
    temp[indx].isClicked = true;
    setProvidereditname(temp[indx].txtProvidername);
    setProvidereditemail(temp[indx].txtEmail);
    setProvidereditnumber(temp[indx].txtContactnumber);
    setProvidereditaddress(temp[indx].txtRegisteredaddress);
    setProvidereditzip(temp[indx].txtZipcode);
    setProvidereditcity(temp[indx].refCity);
    setProvidereditid(temp[indx].id);
    setProviderarray(temp);
  }
  function handleclickPdelete() {
    let url4 = "http://localhost:8080/deleteprovider";
    let req4 = { providereditid: providereditid };
    let header4 = {};
    axios
      .post(url4, req4, header4)
      .then((res) => {})
      .catch();
    window.location.reload();
  }
  function close(itm, indx) {
    let temp = [...providerarray];
    for (const itm of temp) {
      itm.isClicked = false;
    }
    setProviderarray(temp);
  }
  const handleclickSubmit = (e) => {
    let url3 = "http://localhost:8080/editprovider";
    let req3 = {
      providereditid: providereditid,
      providereditname: providereditname,
      providereditemail: providereditemail,
      providereditnumber: providereditnumber,
      providereditaddress: providereditaddress,
      providereditzip: providereditzip,
      providereditcity: providereditcity,
    };
    let header3 = {};
    axios
      .post(url3, req3, header3)
      .then((res) => {
        console.log(res.data);
      })
      .catch();
  };
  useEffect(() => {
    let url2 = "http://localhost:8080/viewprovider";
    let req2 = {};
    let header2 = {};
    axios
      .post(url2, req2, header2)
      .then((res) => {
        var temp = [...res.data];
        for (const element of temp) {
          element.isClicked = false;
        }
        setProviderarray(temp);
        console.log("nw", temp);
      })
      .catch();
  }, []);
  return (
    <>
      <div className="provideredit_container">
        {providerarray.map((itm, indx) => {
          return (
            <>
              <div className="provideredit_list">
                <label>{itm.txtProvidername}</label>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      expandCol(itm.id, indx);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                </div>
              </div>
              <div className="provideredit_collapsible_content">
                <Collapsible open={itm.isClicked}>
                  <div className="provideredit_header">
                    <h2>Edit {itm.txtProvidername} </h2>
                    <div>
                      <button onClick={() => close(itm, indx)}>
                        <AiFillCloseCircle />
                      </button>{" "}
                      <button onClick={() => handleclickPdelete()}>
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                  <div className="provideredit_innerdiv">
                    {/* <div className="provideredit_innerinnerdiv"> */}
                      <div className="provideredit_input">
                        
                        <Input
                          name="Provider Name"
                          value={providereditname}
                          onChange={(e) => {
                            setProvidereditname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="provideredit_input">
                        <Input
                          name="Email"
                          value={providereditemail}
                          onChange={(e) => {
                            setProvidereditemail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="provideredit_input">
                        <Input
                          name="Mobile number"
                          value={providereditnumber}
                          onChange={(e) => {
                            setProvidereditnumber(e.target.value);
                          }}
                        />
                      </div>
                    {/* </div> */}
                    {/* <div className="provideredit_innerinnerdiv"> */}
                      <div className="provideredit_input">
                        <Input
                          name="Address"
                          value={providereditaddress}
                          onChange={(e) => {
                            setProvidereditaddress(e.target.value);
                          }}
                        />
                      </div>
                      <div className="provideredit_input">
                        <Input
                          name="Zip code"
                          value={providereditzip}
                          onChange={(e) => {
                            setProvidereditzip(e.target.value);
                          }}
                        />
                      </div>
                      <div className="provideredit_input">
                        <Input
                          name="City"
                          value={providereditcity}
                          onChange={(e) => {
                            setProvidereditcity(e.target.value);
                          }}
                        />
                      </div>
                    {/* </div> */}
                  </div>
                  <div className="provideredit_button">
                    <button
                      onClick={(e) => {
                        handleclickSubmit(e);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </Collapsible>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}